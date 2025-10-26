from server.models.shift import Shift
from server.database.access_database import DatabaseFetcher
from datetime import datetime
from server.services.base_service import BaseService

#### Time format: Y-M-D H-M-S
class ShiftService(BaseService):
    def __init__(self):
        self.db = DatabaseFetcher()

    def start_shift(self, user_id, end_time, note, staff_on_working):
        user = self._get_user_data_by_id(user_id)
        if (not user):
            return False
        elif user_id in staff_on_working:
            return False
        
        now = datetime.now() 
        end_time_temp = datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S")
        if now > end_time_temp:
            return False

        start_time = now.strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO Shift (start_time, end_time, note, user_id) VALUES (?, ?, ?, ?)"
        self.db.execute(query, (start_time, end_time, note, user_id))
        return Shift(start_time, end_time, note, fullname=user.fullname, user_id=user_id)

    def end_shift(self, user_id, staff_on_working):
        if user_id not in staff_on_working:
            return False
            
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        query = "SELECT end_time FROM Shift WHERE user_id=? AND end_time > ?"
        result = self.db.execute(query, (user_id, now), fetchone=True)
        time_delta =  (datetime.strptime(now, "%Y-%m-%d %H:%M:%S") - datetime.strptime(result[0], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600

        query = "UPDATE Shift SET end_time=? WHERE user_id=? AND end_time > ?"
        self.db.execute(query, (now, user_id, now))
        return time_delta

    def edit_shift(self, user_id, new_end_time, new_note, staff_on_working):
        if user_id not in staff_on_working:
            return False
        
        now = datetime.now() 
        now_str = now.strftime("%Y-%m-%d %H:%M:%S")
        new_end_time_temp = datetime.strptime(new_end_time, "%Y-%m-%d %H:%M:%S")
        if now > new_end_time_temp:
            return False
        
        query = "SELECT end_time FROM Shift WHERE user_id=? AND end_time > ?"
        result = self.db.execute(query, (user_id, now), fetchone=True)
        time_delta =  (datetime.strptime(new_end_time, "%Y-%m-%d %H:%M:%S") - datetime.strptime(result[0], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600

        query = "UPDATE Shift SET end_time=?, note=? WHERE user_id=? AND end_time > ?"
        self.db.execute(query, (new_end_time, new_note, user_id, now_str))
        return time_delta
    
    def get_shifts_of(self, user_id): # get all shifts of month of user_id
        shifts_data = []

        query = "SELECT * FROM Shift WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') AND user_id=?"
        shifts = self.db.execute(query, (user_id,), fetchall=True)
        for shift in shifts:
            o_shift = Shift(shift[1], shift[2], shift[3], id=shift[0])
            shifts_data.append(o_shift.to_dict())
        return shifts_data
    
    def get_all_shifts_today(self, user_id, server): #get all shifts of to day of all staff
        if (not self._is_manager(user_id)):
            return False
        shifts_data = server.get_shift_today()
        return shifts_data
    
    def get_shift_today_of(self, user_id): #get shift of user_id on today
        list_shifts = []
        query = "SELECT * FROM Shift WHERE user_id=? AND strftime('%Y-%m-%d', start_time) = strftime('%Y-%m-%d', 'now')"
        shifts = self.db.execute(query, (user_id,), fetchall=True)
        for shift in shifts:
            o_shift = Shift(shift[1], shift[2], shift[3], id=shift[0], user_id=shift[4])
            list_shifts.append(o_shift.to_dict())
        return list_shifts
    

    
        
    
        





