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
        self.__cache = {"staff_on_working" : [], "last_update" : 0}
        threading.Thread(target=self.automatic_end_working, daemon=True).start()

    def _get_staff_on_working(self):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = """
        SELECT U.username, U.fullname, S.start_time, S.end_time
        FROM Shift S
        JOIN User U ON S.user_id = U.id
        WHERE ? BETWEEN S.start_time AND S.end_time
        """
        result = self.__db.execute(query, (now,), fetchall=True)
        return [dict(r) for r in result]

    def automatic_end_working(self):
        while True:
            if time.time() - self.__cache["last_update"] > TIME_REFRESH:
                self.__cache["staff_on_working"] = self._get_staff_on_working()
                self.sheet.update_staff_on_working(self.__cache["staff_on_working"])
                self.__cache["last_update"] = time.time()

