from server.services.shift_service import ShiftService
from server.services.user_service import UserService
from server.services.log_service import LogService

class ManagerController():
    def __init__(self):
        self.shift_service = ShiftService()
        self.user_service = UserService()
        self.log_service = LogService()

    def create_account(self, user_id, user_role, username, password, fullname, role, server):
        if user_role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.user_service.create_user(user_id, username, password, fullname, role)
        if result:
            self.log_service.write_log(f"Create new account {username} {fullname} {role}", user_id)
            server.append_staff(result)
            return {"status" : "success", "message" : "Successful"}
        else:
            return {"status" : "fail", "message" : "Username already exists"}

    def reset_password(self, user_id, role, id, new_password):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.user_service.reset_password(user_id, id, new_password)
        if result:
            self.log_service.write_log(f"Reset password {id}", user_id)
            return {"status" : "success", "message" : "Successful"}
        return {"status" : "fail", "message" : "Username does not exists"}
        
    def delete_account(self, user_id, role, id):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.user_service.delete_user(user_id, id)
        if result:
            self.log_service.write_log(f"Delete account {id}", user_id)
            return {"status" : "success", "message" : "Successful"}
        return {"status" : "fail", "message" : "Username does not exists"}
        
    def users(self, user_id, role):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.user_service.get_all_user(user_id)
        if result:
            return {"status" : "success", "message" : "Get all user successful", "data" : result}
        return {"status" : "fail", "message" : "Do not have permission"}
    
    def get_data_of(self, user_id, role, id):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.user_service.get_data_of(user_id, id)
        if result:
            return {"status" : "success", "message" : f"Get data of {id} successful", "data" : result}
        return {"status" : "fail", "message" : "Username does not exists"}
    
    def get_all_shifts_today(self, user_id, role, server): # get list of shifts today
        result = self.shift_service.get_all_shifts_today(user_id, server)
        if result:
            return {"status" : "success", "message" : f"Get all shifts successful", "data" : result}
        return {"status" : "fail", "message" : "Do not have any shift"}
    
    def end_shift_id(self, id, user_id, role):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.shift_service.end_shift_id(id)
        if result:
            self.log_service.write_log(f"End shift {id} by manager", user_id)
            return {"status" : "success", "message" : f"End shift {id} successful", "time_delta" : result[0], "staff_id" : result[1]}
        return {"status" : "fail", "message" : "The shift is over"}
    
    def get_log_by_day(self, user_id, role, year, month, day):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.log_service.get_log_by_day(user_id, year, month, day)
        if result:
            return {"status" : "success", "message" : "Successful", "data" : result}
        return {"status" : "fail", "message" : "Do not have any log"}
    
    def get_log_by_user_id(self, user_id, role, id):
        if role != "manager": return {"status" : "fail", "message" : "Do not have permission"}
        result = self.log_service.get_log_by_user_id(user_id, id)
        if result:
            return {"status" : "success", "message" : "Successful", "data" : result}
        return {"status" : "fail", "message" : "Do not have any log"}
    
    def get_staffs(self): # just for server call
        result = self.user_service.get_staffs()
        return result
