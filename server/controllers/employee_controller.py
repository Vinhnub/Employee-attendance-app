from server.services.shift_service import ShiftService
from server.services.log_service import LogService
from datetime import datetime

class EmployeeController:
    def __init__(self):
        self.shift_service = ShiftService()
        self.log_service = LogService() 

    def update_data(self, user_id, server, time_delta):
        data = self.shift_service.get_shift_today_of(user_id)
        server.update_shift_today_of(user_id, data)
        server.update_total_hour_of(user_id, time_delta)

    def start_shift(self, user_id, role, end_time, note, server):
        if role != "staff" :
            return {
                "status": "fail",
                "message": "Bạn không phải nhân viên"
            }

        result = self.shift_service.start_shift(user_id, end_time, note, server.get_staff_on_working())

        if result:
            result_dict = result.to_dict()
            start_time = result_dict["start_time"]
            time_delta =  (datetime.strptime(end_time, "%Y-%m-%d %H:%M:%S") - datetime.strptime(start_time, "%Y-%m-%d %H:%M:%S")).total_seconds() / 3600
            server.append_shift_today(result_dict)
            self.log_service.write_log(f"Start shift to {end_time}", user_id)
            return {
                "status": "success",
                "message": "Vào ca thành công",
                "time_delta" : time_delta
            }
    
        return {
            "status" : "fail",
            "message" : "Thời gian không hợp lệ hoặc bạn đã đang trong ca"
        }

    def end_shift(self, user_id, role, server):
        if role != "staff" :
            return {
                "status": "fail",
                "message": "Bạn không phải nhân viên"
            }

        result = self.shift_service.end_shift(user_id, server.get_staff_on_working())

        if result:
            self.log_service.write_log("End shift", user_id)
            return {
                "status": "success",
                "message": "Đã kết thúc ca",
                "time_delta" : result
            }
        return {
            "status": "fail",
            "message": "Bạn đang không trong ca"
        }
    
    def edit_shift(self, user_id, role, new_end_time, new_note, server):
        if role != "staff" :
            return {
                "status": "fail",
                "message": "Bạn không phải nhân viên"
            }

        result = self.shift_service.edit_shift(user_id, new_end_time, new_note, server.get_staff_on_working())

        if result:
            self.log_service.write_log(f"Edit shift new end time {new_end_time}, new note {new_note}", user_id)
            return {
                "status": "success",
                "message": "Chỉnh sửa ca thành công",
                "time_delta" : result
            }
        return {
            "status": "fail",
            "message": "Thời gian không hợp lệ hoặc bạn đang không trong ca"
        }
    
    def get_shifts_of(self, user_id): # get all shifts of month of user_id
        result = self.shift_service.get_shifts_of(user_id)

        if result:
            return {
                "status": "success",
                "message": "Thành công",
                "data" : result}
        return {
            "status": "fail",
            "message": "Không có bất kì ca nào"
        }
