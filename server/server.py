from server.utils.config import *
from server.services.gsheet_service import *
from server.controllers.auth_controller import AuthController
from server.controllers.employee_controller import EmployeeController
from server.controllers.manager_controller import ManagerController
from server.database.access_database import DatabaseFetcher


import threading
import time
from datetime import datetime

class Server:
    def __init__(self):
        self.sheet = GGSheet()
        self.auth_controller = AuthController()
        self.emp_controller = EmployeeController()
        self.manager_controller = ManagerController()
        self.__db = DatabaseFetcher()
        self.__cache = {"staff_on_working" : {}, "last_update" : 0}
        self.__shift_today = []
        threading.Thread(target=self.automatic_end_working, daemon=True).start()

    def fetch_staff_on_working(self): # to get staff is working and get shift on today
        self.__shift_today = []
        self.__cache["staff_on_working"] = {}
        now = datetime.now()
        today = datetime.now().strftime("%Y-%m-%d") 
        query = """
        SELECT U.username, U.fullname, S.start_time, S.end_time, S.note
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
                self.__shift_today.append(list((item[1], item[2], item[3], True, item[4])))
            else:
                self.__shift_today.append(list((item[1], item[2], item[3], False, item[4])))
        self.sheet.update_shift_today(self.__shift_today)
        return

    def append_shift_today(self, data):
        start_time = datetime.strptime(data["start_time"], "%Y-%m-%d %H:%M:%S")
        end_time = datetime.strptime(data["end_time"], "%Y-%m-%d %H:%M:%S")
        self.__cache["staff_on_working"][data["username"]] = {"start_time" : start_time.strftime("%H:%M:%S"), "end_time" : end_time.strftime("%H:%M:%S")}
        self.sheet.append_shift_today(data)

    def automatic_end_working(self):
        while True:
            if time.time() - self.__cache["last_update"] > TIME_REFRESH:
                self.fetch_staff_on_working()
                self.__cache["last_update"] = time.time()

    def get_staff_on_working(self):
        return self.__cache["staff_on_working"]

