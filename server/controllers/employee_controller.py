from server.services.shift_service import ShiftService

class EmployeeController:
    def __init__(self):
        self.shift_service = ShiftService()

    def start_shift(self, user_id, end_time):
        self.shift_service.start_shift(user_id, end_time)
        return {"status": "success", "message": "Shift started"}

    def end_shift(self, user_id):
        self.shift_service.end_shift(user_id)
        return {"status": "success", "message": "Shift ended"}
