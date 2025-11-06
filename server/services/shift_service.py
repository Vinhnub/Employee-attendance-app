from server.models.shift import Shift
from datetime import datetime
from server.services.base_service import BaseService

#### Time format: Y-M-D H:M:S
class ShiftService(BaseService):
    def __init__(self, db):
        self.db = db

    def start_shift(self, user_id, end_time, note, staff_on_working):
        user = self._get_user_data_by_id(user_id)
        if not user:
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
    
    def end_shift_id(self, target_id): # for manager
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        query = "SELECT * FROM Shift WHERE id=? AND end_time > ?"
        result = self.db.execute(query, (target_id, now), fetchone=True)
        if result:
            time_delta =  (datetime.strptime(now, "%Y-%m-%d %H:%M:%S") - datetime.strptime(result[2], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600
            query = "UPDATE Shift SET end_time=? WHERE id=?"
            self.db.execute(query, (now, target_id))
            return time_delta, result[4]
        return False

    def edit_shift(self, user_id, new_end_time, new_note, staff_on_working):
        if user_id not in staff_on_working:
            return False
        
        now = datetime.now() 
        now_str = now.strftime("%Y-%m-%d %H:%M:%S")
        new_end_time_str = datetime.strptime(new_end_time, "%Y-%m-%d %H:%M:%S")
        if now > new_end_time_str:
            return False
        
        query = "SELECT end_time FROM Shift WHERE user_id=? AND end_time > ?"
        result = self.db.execute(query, (user_id, now), fetchone=True)
        time_delta =  (datetime.strptime(new_end_time, "%Y-%m-%d %H:%M:%S") - datetime.strptime(result[0], "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600

        query = "UPDATE Shift SET end_time=?, note=? WHERE user_id=? AND end_time > ?"
        self.db.execute(query, (new_end_time, new_note, user_id, now_str))
        return time_delta

    def edit_shift_by_manager(self, shift_id, new_start_time, new_note): # edit staff's shift by manager
        query = "SELECT * FROM Shift WHERE id=?"
        shift = self.db.execute(query, (shift_id, ), fetchone=True)
        o_shift = Shift(shift[1], shift[2], shift[3], shift_id=shift[0], user_id=shift[4])
        if not o_shift:
            return False
        if o_shift.end_time < new_start_time:
            return False

        time_delta = (datetime.strptime(o_shift.start_time, "%Y-%m-%d %H:%M:%S") - datetime.strptime(new_start_time,"%Y-%m-%d %H:%M:%S")).total_seconds() / 3600
        query = "UPDATE Shift SET start_time=?, note=? WHERE id=?"
        self.db.execute(query, (new_start_time, new_note, shift_id))
        return time_delta

    def get_shifts_of(self, user_id): # get all shifts of month of user_id
        now = datetime.now()
        query = "SELECT * FROM Shift WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') AND user_id=?"
        shifts = self.db.execute(query, (user_id,), fetchall=True)
        return [Shift(shift[1], shift[2], shift[3], shift_id=shift[0], is_working=(now < datetime.strptime(shift[2], "%Y-%m-%d %H:%M:%S"))).to_dict() for shift in shifts]
    
    def get_all_shifts_today(self, user_id, server): #get all shifts of to day of all staff
        shifts_data = server.get_shift_today()
        return shifts_data
    
    def get_shift_today_of(self, user_id): #get shift of user_id on today and only for server
        query = "SELECT * FROM Shift WHERE user_id=? AND strftime('%Y-%m-%d', start_time) = strftime('%Y-%m-%d', 'now')"
        shifts = self.db.execute(query, (user_id,), fetchall=True)
        return [Shift(shift[1], shift[2], shift[3], shift_id=shift[0], user_id=shift[4]).to_dict() for shift in shifts]

    def get_all_shifts_current_month(self):
        query = """SELECT S.id, S.start_time, S.end_time, S.note, S.user_id FROM Shift S INNER JOIN User U ON S.user_id = U.id WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') ORDER BY user_id"""
        shifts = self.db.execute(query, fetchall=True)
        return [Shift(shift[1], shift[2], shift[3], shift_id=shift[0], user_id=shift[4]).to_dict() for shift in shifts]


    
        
    
        





