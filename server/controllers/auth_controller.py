from server.services.user_service import UserService
from server.utils.hashing import *

class AuthController:
    def __init__(self):
        self.user_service = UserService()

    def login(self, username, password):
        result = self.user_service.login(username, password)
        if result:
            return {"status" : "success", "message": "Successful", "data" : result.to_dict()}
        return {"status" : "fail", "message": "Invalid credentials"}
    
    def change_password(self, username, old_password, new_password):
        result = self.user_service.change_password(username, old_password, new_password)
        if result:
            return {"status" : "success", "message" : "Successful"}
        else:
            return {"status" : "fail", "message" : "Wrong password or username does not exist."}

