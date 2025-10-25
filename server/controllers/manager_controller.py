from server.services.shift_service import ShiftService
from server.services.user_service import UserService

class ManagerController:
    def __init__(self):
        #self.shift_service = ShiftService()
        self.user_service = UserService()

    def create_account(self, user_id, username, password, fullname, role):
        result = self.user_service.create_user(user_id,username, password, fullname, role)
        if result:
            return {"status" : "success", "message" : "Successful"}
        else:
            return {"status" : "fail", "message" : "Do not have permission or username already exists"}

    def reset_password(self, user_id, username, new_password):
        result = self.user_service.reset_password(user_id, username, new_password)
        if result:
            return {"status" : "success", "message" : "Successful"}
        else:
            return {"status" : "fail", "message" : "Do not have permission or username does not exists"}