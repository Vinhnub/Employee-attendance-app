from server.services.shift_service import ShiftService
from server.services.user_service import UserService

class ManagerController:
    def __init__(self):
        self.shift_service = ShiftService()
        self.user_service = UserService()

    def create_account(self, username, password, fullname, role):
        result = self.user_service.create_user(username, password, fullname, role)
        if result:
            return {"status" : "success", "message" : "Successful"}
        else:
            return {"status" : "fail", "message" : "Username already exists"}

    def reset_password(self):
        pass
