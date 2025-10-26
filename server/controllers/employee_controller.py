from server.services.shift_service import ShiftService
from server.services.log_service import LogService

class EmployeeController:
    def __init__(self):
        self.shift_service = ShiftService()
        self.log_service = LogService()

    def start_shift(self, user_id, end_time, note, server):
        result = self.shift_service.start_shift(user_id, end_time, note, server.get_staff_on_working())
        if result:
            server.append_shift_today(result.to_dict())
            data = self.shift_service.get_shift_today_of(user_id)
            server.update_shift_of(user_id, data)
            self.log_service.write_log("Start shift", user_id)
            return {"status": "success", "message": "Shift started"}
    
        return {"status" : "fail", "message" : "Invalid time or user is working"}

    def end_shift(self, user_id, server):
        result = self.shift_service.end_shift(user_id, server.get_staff_on_working())
        if result:
            data = self.shift_service.get_shift_today_of(user_id)
            server.update_shift_of(user_id, data)
            self.log_service.write_log("End shift", user_id)
            return {"status": "success", "message": "Shift ended"}
        return {"status": "fail", "message": "User is not working"}
    
    def edit_shift(self, user_id, new_end_time, new_note, server):
        result = self.shift_service.edit_shift(user_id, new_end_time, new_note, server.get_staff_on_working())
        if result:
            data = self.shift_service.get_shift_today_of(user_id)
            server.update_shift_of(user_id, data)
            self.log_service.write_log(f"Edit shift new end time {new_end_time}, new note {new_note}", user_id)
            return {"status": "success", "message": "Edited successfully"}
        return {"status": "fail", "message": "User is not working or invalid time"}
    
    def get_shifts_of(self, user_id):
        result = self.shift_service.get_shifts_of(user_id)
        if result:
            return {"status": "success", "message": "Successfully", "data" : result}
        return {"status": "fail", "message": "Do not have any shift"}
