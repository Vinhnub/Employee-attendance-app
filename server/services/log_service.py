from server.models.log import Log
from server.database.access_database import DatabaseFetcher
from datetime import datetime
from server.services.base_service import BaseService

class LogService(BaseService):
    def __init__(self):
        self.db = DatabaseFetcher()

    def write_log(self, content, user_id):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO UserLog (content, date_time, user_id) VALUES (?, ?, ?)"
        self.db.execute(query, (content, now, user_id))

    def read_log(self):
        pass

    def get_log_by_day(self, user_id, year, month, day):
        if (not self._is_manager(user_id)):
            return False
        
        log_data = []
        query = """ SELECT UL.id, content, date_time, U.id, U.fullname  FROM UserLog UL INNER JOIN User U ON UL.user_id = U.id
        WHERE strftime('%Y', datetime(date_time)) = ?
        AND strftime('%m', datetime(date_time)) = ?
        AND strftime('%d', datetime(date_time)) = ?
        """
        logs = self.db.execute(query, (str(year), str(month), str(day)), fetchall=True)
        for log in logs:
            o_log = Log(*log)
            log_data.append(o_log.to_dict())
        return log_data

    def get_log_by_user_id(self, user_id, id):
        if (not self._is_manager(user_id)):
            return False
        
        log_data = []
        query = "SELECT * FROM UserLog WHERE user_id=?"
        logs = self.db.execute(query, (id,), fetchall=True)
        for log in logs:
            o_log = Log(*log)
            log_data.append(o_log.to_dict())
        return log_data