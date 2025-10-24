from server.models.shift import Shift
from server.database.access_database import DatabaseFetcher
from datetime import datetime

#### Time format: Y-M-D H-M-S
class ShiftService:
    def __init__(self):
        self.db = DatabaseFetcher()

    def start_shift(self, user_id, end_time):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO shifts (user_id, start_time, end_time) VALUES (?, ?, ?)"
        self.db.execute(query, (user_id, now, end_time))

    def end_shift(self, user_id):
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "UPDATE shifts SET end_time=? WHERE user_id=? AND end_time > ?"
        self.db.execute(query, (now, user_id, now))

    def edit_shift(self):
        pass
