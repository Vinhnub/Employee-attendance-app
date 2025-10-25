from server.models.shift import Shift
from server.database.access_database import DatabaseFetcher
from datetime import datetime
from server.services.base_service import BaseService
from server.models.user import User

#### Time format: Y-M-D H-M-S
class ShiftService(BaseService):
    def __init__(self):
        self.db = DatabaseFetcher()

    def start_shift(self, user_id, end_time, note, staff_on_working):
        now = datetime.now() 
        end_time_temp = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
        if now > end_time_temp:
            return False
        user = self._get_user_data_by_id(user_id)
        if (not user):
            return False
        elif user.username in staff_on_working:
            return False

        start_time = now.strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO Shift (start_time, end_time, note, user_id) VALUES (?, ?, ?, ?)"
        self.db.execute(query, (start_time, end_time, note, user_id))
        return Shift(start_time, end_time, note, user.fullname, username=user.username)

    def end_shift(self, user_id):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "UPDATE Shift SET end_time=? WHERE user_id=? AND end_time > ?"
        self.db.execute(query, (now, user_id, now))

    def edit_shift(self):
        pass
