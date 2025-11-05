from server.services.shift_service import ShiftService
from server.services.user_service import UserService
from server.services.log_service import LogService

class ManagerController:
    def __init__(self):
        self.shift_service = ShiftService()
        self.user_service = UserService()
        self.log_service = LogService()

    def create_account(self, user_id, user_role, username, password, fullname, role, server):
        if user_role != "manager":
            return {
                "status" : "fail",
                "message" : "Do not have permission"
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
                "message" : "Successful"
            }
        else:
            return {
                "status" : "fail",
                "message" : "Username already exists"
            }

    def reset_password(self, user_id, role, target_id, new_password):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Do not have permission"
            }

        result = self.user_service.reset_password(user_id, target_id, new_password)

        if result:
            self.log_service.write_log(f"Reset password {target_id}", user_id)
            return {
                "status" : "success",
                "message" : "Successful"
            }
        return {
            "status" : "fail",
            "message" : "Username does not exists"
        }
        
    def delete_account(self, user_id, role, target_id):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Do not have permission"
            }

        result = self.user_service.delete_user(user_id, target_id)

        if result:
            self.log_service.write_log(f"Delete account {target_id}", user_id)
            return {
                "status" : "success",
                "message" : "Successful"
            }
        return {
            "status" : "fail",
            "message" : "Username does not exists"
        }
        
    def users(self, user_id, role):
        if role != "manager": return {
            "status" : "fail",
            "message" : "Do not have permission"
        }

        result = self.user_service.get_all_user(user_id)

        if result:
            return {
                "status" : "success",
                "message" : "Get all user successful",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Do not have permission"
        }
    
    def get_data_of(self, user_id, role, target_id):
        if role != "manager":
            return {
            "status" : "fail",
                "message" : "Do not have permission"
            }

        staff_data = self.user_service.get_data_of(user_id, target_id)

        if staff_data:
            return {
                "status" : "success",
                "message" : f"Get data of {target_id} successful",
                "data" : staff_data
            }
        return {
            "status" : "fail",
            "message" : "User does not exists"
        }

    def get_shifts_of(self, user_id, role, target_id):
        if role != "manager" :
            return  {
                "status" : "fail",
                "message" : "Do not have permission"
            }

        staff_shifts = self.shift_service.get_shifts_of(target_id)

        if staff_shifts:
            return {
                "status" : "success",
                "message" : f"Get shifts successful",
                "data" : staff_shifts
            }
        return {
            "status" : "fail",
            "message" : "User does not have any shifts or exists"
        }
    
    def get_all_shifts_today(self, user_id, role, server): # get list of shifts today
        result = self.shift_service.get_all_shifts_today(user_id, server)

        if result:
            return {
                "status" : "success",
                "message" : f"Get all shifts successful",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Do not have any shift"
        }
    
    def end_shift_id(self, target_id, user_id, role):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.shift_service.end_shift_id(target_id)

        if result:
            self.log_service.write_log(f"End shift {target_id} by manager", user_id)
            return {
                "status" : "success",
                "message" : f"End shift {target_id} successful",
                "time_delta" : result[0],
                "staff_id" : result[1]
            }
        return {
            "status" : "fail",
            "message" : "The shift is over"
        }

    def edit_shift(self, user_id, role, target_id, shift_id, new_start_time, new_note, staff_on_working):
        if role != "manager":
            return {
                "status": "fail",
                "message": "Do not have permission"
            }

        if target_id in staff_on_working:
            return {
                "status": "fail",
                "message" : "User is working"
            }

        result = self.shift_service.edit_shift_by_manager(shift_id, new_start_time, new_note)

        if result:
            self.log_service.write_log(f"Edit shift new start time {new_start_time}, new note {new_note} by manager", user_id)
            return {
                "status": "success",
                "message": "Edited successfully",
                "time_delta" : result
            }
        return {
            "status": "fail",
            "message": "Invalid time"
        }

    def get_log_by_day(self, user_id, role, year, month, day):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Do not have permission"
            }

        result = self.log_service.get_log_by_day(user_id, year, month, day)

        if result:
            return {
                "status" : "success",
                "message" : "Successful",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Do not have any log"
        }
    
    def get_log_by_user_id(self, user_id, role, target_id):
        if role != "manager":
            return {
                "status" : "fail",
                "message" : "Do not have permission"
            }

        result = self.log_service.get_log_by_user_id(user_id, target_id)

        if result:
            return {
                "status" : "success",
                "message" : "Successful",
                "data" : result
            }
        return {
            "status" : "fail",
            "message" : "Do not have any log"
        }
    
    def get_staffs(self): # just for server call
        result = self.user_service.get_all_staffs()
        return result
