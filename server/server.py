from server.services.gsheet_service import *
from server.controllers.auth_controller import AuthController
from server.controllers.employee_controller import EmployeeController
from server.controllers.manager_controller import ManagerController
from server.database.access_database import DatabaseFetcher
from server.models.shift import Shift
from server.utils.config import *

import threading
import time
from datetime import datetime, date

class Server:
    def __init__(self):
        self.sheet = GGSheet()
        self.auth_controller = AuthController()
        self.emp_controller = EmployeeController()
        self.manager_controller = ManagerController()
        self.__db = DatabaseFetcher()
        self.__cache = {"staff_on_working" : {}, "last_update" : 0, "token_banned" : {}}
        self.__shift_today = []
        self.__last_index = 0
        self.__staff_index = {}
        self._load_current_month()
        self._set_staff_index(self.manager_controller.get_staffs())
        threading.Thread(target=self.automatic_end_working, daemon=True).start()

    def get_shift_today(self):
        return self.__shift_today
    
    def get_staff_on_working(self):
        return self.__cache["staff_on_working"]

    def get_token_banned(self):
        return self.__cache["token_banned"]

    def _load_current_month(self):
        path = "server/database/current_month.txt"
        with open(path, "r", encoding="utf-8") as file:
            cur_m = file.read()
            self.__cur_month = int(cur_m)

    def _update_current_month(self, cur_month):
        path = "server/database/current_month.txt"
        with open(path, "w", encoding="utf-8") as file:
            file.write(str(cur_month))
    
    def _is_new_month(self):
        today = date.today()
        if today.month != self.__cur_month:
            self.__cur_month = today.month
            self._update_current_month(self.__cur_month)
            return True
        else:
            self.__cur_month = today.month
            return False

    def _check_token_expired(self):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        for token, expire in self.__cache["token_banned"].items():
            if expire < now:
                del self.__cache["token_banned"][token]

    def _set_staff_index(self, list_staffs):
        index = 2
        for staff in list_staffs:
            self.__staff_index[staff["id"]] = index
            index += 1
        self.__last_index = index

    def fetch_staff_on_working(self): # to get staff is working and get shift on today
        self.__shift_today = []
        self.__cache["staff_on_working"] = {}
        now = datetime.now()
        today = datetime.now().strftime("%Y-%m-%d") 
        query = """
        SELECT U.id, U.fullname, S.start_time, S.end_time, S.note, S.id
        FROM Shift S
        JOIN User U ON S.user_id = U.id
        WHERE DATE(S.start_time) = ?
        ORDER BY S.start_time
        """
        result = self.__db.execute(query, (today,), fetchall=True)
        for item in result:
            if now < datetime.strptime(item[3], "%Y-%m-%d %H:%M:%S"):
                if item[0] not in self.__cache["staff_on_working"]:
                    start_time = datetime.strptime(item[2], "%Y-%m-%d %H:%M:%S")
                    end_time = datetime.strptime(item[3], "%Y-%m-%d %H:%M:%S")
                    self.__cache["staff_on_working"][item[0]] = {"start_time" : start_time.strftime("%H:%M:%S"), "end_time" : end_time.strftime("%H:%M:%S")}
                shift = Shift(item[2], item[3], item[4], shift_id=item[5], user_id=item[0], fullname=item[1], is_working=True)
                self.__shift_today.append(shift.to_dict())
            else:
                shift = Shift(item[2], item[3], item[4], shift_id=item[5], user_id=item[0], fullname=item[1], is_working=False)
                self.__shift_today.append(shift.to_dict())
        return

    def append_shift_today(self, shift):
        start_time = datetime.strptime(shift["start_time"], "%Y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(shift["end_time"], "%Y-%m-%d %H:%M:%S")
        self.__cache["staff_on_working"][shift["user_id"]] = {"start_time" : start_time.strftime("%H:%M:%S"), "end_time" : end_time.strftime("%H:%M:%S")}
        self.sheet.append_shift_today(shift)

    def update_shift_today_of(self, user_id, list_shifts):
        row = self.__staff_index[user_id]
        now =  date.today()
        column = now.day + 1
        self.sheet.append_shift_current_month(list_shifts, row, column)

    def refresh_sheet(self, all_shifts_current_month):
        prev_day = 0
        prev_user_id = 0
        list_shifts = [] # list shift to combine shift per user to day and update each day
        for shift in all_shifts_current_month:
            shift_day = datetime.strptime(shift["start_time"], "%Y-%m-%d %H:%M:%S").day
            if shift_day != prev_day or prev_user_id != shift["user_id"]:
                if prev_day != 0 or prev_user_id != 0:
                    row = self.__staff_index[list_shifts[-1]["user_id"]]
                    column = prev_day + 1
                    self.sheet.append_shift_current_month(list_shifts, row, column)
                prev_day = shift_day
                prev_user_id = shift["user_id"]
                list_shifts = [shift]
            else:
                list_shifts.append(shift)
        if len(list_shifts) > 0:
            row = self.__staff_index[list_shifts[-1]["user_id"]]
            column = prev_day + 1
            self.sheet.append_shift_current_month(list_shifts, row, column)

    def update_total_hour_of(self, user_id, time_delta):
        row = self.__staff_index[user_id]
        self.sheet.update_total_hour_of(row, time_delta)

    def append_staff(self, staff):
        self.__staff_index[staff["id"]] = self.__last_index
        self.__last_index += 1
        self.sheet.append_staff(staff)


    def automatic_end_working(self):
        while True:
            if time.time() - self.__cache["last_update"] > TIME_REFRESH:
                self.fetch_staff_on_working()
                self.__cache["last_update"] = time.time()
                self.sheet.update_shift_today(self.__shift_today)
                self._check_token_expired()
                if self._is_new_month():
                    list_staff = self.manager_controller.get_staffs()
                    self.sheet.save_data_per_month()
                    self.sheet.draw_new_month(list_staff)



