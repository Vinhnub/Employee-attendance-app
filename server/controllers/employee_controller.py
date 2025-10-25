from server.services.shift_service import ShiftService

class EmployeeController:
    def __init__(self):
        self.shift_service = ShiftService()

    def start_shift(self, user_id, end_time, note, server):
        result = self.shift_service.start_shift(user_id, end_time, note, server.get_staff_on_working())
        if result:
            server.append_shift_today(result.to_dict())
            return {"status": "success", "message": "Shift started"}
    
        return {"status" : "fail", "message" : "Invalid time or user is working"}

    def end_shift(self, user_id):
        self.shift_service.end_shift(user_id)
        return {"status": "success", "message": "Shift ended"}
