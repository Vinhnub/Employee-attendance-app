from server.services.shift_service import ShiftService
from server.services.user_service import UserService
from server.services.log_service import LogService

class ManagerController:
    def __init__(self, db):
        self.shift_service = ShiftService(db)
        self.user_service = UserService(db)
        self.log_service = LogService(db)

    def create_account(self, user_id, user_role, username, password, fullname, role, server):
        if user_role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        if role not in ("manager", "staff"):
            return {
                "status" : "fail",
                "message" : "Role must be 'manager' or 'staff'"
            }

        result = self.user_service.create_user(user_id, username, password, fullname, role)

        if result:
            self.log_service.write_log(f"Create new account {username} {fullname} {role}", user_id)
            server.append_staff(result)
            return {
                "status" : "success",
                "message" : "Thành công"
            }
        else:
            return {
                "status" : "fail",
                "message" : "Tên tài khoản đã tồn tại"
            }

    def reset_password(self, user_id, role, target_id, new_password):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        result = self.user_service.reset_password(user_id, target_id, new_password)

        if result:
            self.log_service.write_log(f"Reset password {target_id}", user_id)
            return {
                "status" : "success",
                "message" : "Thành công"
            }
        return {
            "status" : "fail",
            "message" : "Tài khoản không tồn tại"
        }
        
    def delete_account(self, user_id, role, target_id):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        result = self.user_service.delete_user(user_id, target_id)

        if result:
            self.log_service.write_log(f"Delete account {target_id}", user_id)
            return {
                "status" : "success",
                "message" : "Thành công"
            }
        return {
            "status" : "fail",
            "message" : "Tài khoản không tồn tại"
        }
        
    def users(self, user_id, role):
        if role != "manager": return {
            "status" : "fail",
            "message" : "Không có quyền"
        }

        result = self.user_service.get_all_user(user_id)

        if result:
            return {
                "status" : "success",
                "message" : "Lấy tất cả người dùng thành công",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Không có quyền"
        }
    
    def get_data_of(self, user_id, role, target_id):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        staff_data = self.user_service.get_data_of(user_id, target_id)

        if staff_data:
            return {
                "status" : "success",
                "message" : f"Lấy thông tin của {target_id} thành công",
                "data" : staff_data
            }
        return {
            "status" : "fail",
            "message" : "Tài khoản không tồn tại"
        }

    def get_shifts_of(self, user_id, role, target_id):
        if role != "manager" :
            return  {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        staff_shifts = self.shift_service.get_shifts_of(target_id)

        if staff_shifts:
            return {
                "status" : "success",
                "message" : f"Lấy ca làm thành công",
                "data" : staff_shifts
            }
        return {
            "status" : "fail",
            "message" : "Người dùng không tồn tại hoặc không có ca làm nào"
        }
    
    def get_all_shifts_today(self, user_id, role, server): # get list of shifts today
        result = self.shift_service.get_all_shifts_today(user_id)

        if result:
            return {
                "status" : "success",
                "message" : f"Lấy tất cả ca làm thành công",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Không có bất kì ca làm nào"
        }
    
    def end_shift_id(self, target_id, user_id, role):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }
        result = self.shift_service.end_shift_id(target_id)

        if result:
            self.log_service.write_log(f"End shift {target_id} by manager", user_id)
            return {
                "status" : "success",
                "message" : f"Kết thúc ca {target_id} thành công",
                "time_delta" : result[0],
                "staff_id" : result[1]
            }
        return {
            "status" : "fail",
            "message" : "Ca làm đã kết thúc"
        }

    def edit_shift(self, user_id, role, target_id, shift_id, new_start_time, new_note, staff_on_working):
        if role != "manager":
            return {
                "status": "fail",
                "message" : "Không có quyền"
            }

        if target_id in staff_on_working:
            return {
                "status": "fail",
                "message" : "Nhân viên đang làm việc"
            }

        result = self.shift_service.edit_shift_by_manager(shift_id, new_start_time, new_note)

        if result:
            self.log_service.write_log(f"Edit shift new start time {new_start_time}, new note {new_note} by manager", user_id)
            return {
                "status": "success",
                "message": "Chỉnh sửa thành công",
                "time_delta" : result["time_delta"]
            }
        return {
            "status": "fail",
            "message": "Thời gian không hợp lệ"
        }

    def get_log_by_day(self, user_id, role, year, month, day):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        result = self.log_service.get_log_by_day(user_id, year, month, day)

        if result:
            return {
                "status" : "success",
                "message" : "Thành công",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Không có bất kì log nào"
        }
    
    def get_log_by_user_id(self, user_id, role, target_id):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        result = self.log_service.get_log_by_user_id(user_id, target_id)

        if result:
            return {
                "status" : "success",
                "message" : "Thành công",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Người dùng không tồn tại"
        }

    def refresh_sheet(self, user_id, role, server_instance):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Không có quyền"
            }

        all_shifts_current_month = self.shift_service.get_all_shifts_current_month()
        server_instance.refresh_sheet(all_shifts_current_month)

        return {
            "status" : "success",
            "message" : "Thành công"
        }

    def get_staffs(self): # just for server call
        result = self.user_service.get_all_staffs()
        return result
