from server.services.user_service import UserService
from server.services.log_service import LogService
from server.utils.hashing import *
from server.utils.jwt_handler import create_access_token

class AuthController:
    def __init__(self):
        self.user_service = UserService()
        self.log_service = LogService()

    def me(self, user_id):
        user = self.user_service.me(user_id)
        if user:
            return {"status" : "success", "message" : "Successful", "data" : user.to_dict()}
        else:
            return {"status" : "fail", "message" : "Something is wrong"}

    def login(self, username, password, server):
        result = self.user_service.login(username, password)
        if not result:
            return {"status": "fail", "message": "Wrong username or password"}

        user_data = result.to_dict()
        user_id = user_data["id"]

        access_token = create_access_token({"user_id": user_id})

        if user_data["username"] in server.get_staff_on_working():
            current_shift = server.get_staff_on_working()[user_data["username"]]
        else:
            current_shift = None

        return {
            "status": "success",
            "message": "Login Successful",
            "data": user_data,
            "current_shift": current_shift,
            "access_token": access_token
        }

    def change_password(self, user_id, old_password, new_password):
        result = self.user_service.change_password(user_id, old_password, new_password)
        if result:
            log_content = "Change password"
            self.log_service.write_log(log_content, user_id)
            return {"status": "success", "message": "Change password successful"}
        else:
            return {"status": "fail", "message": "wrong password or username does not exist"}
