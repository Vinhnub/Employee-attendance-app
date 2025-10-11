from server.services.user_service import UserService

class AuthController:
    def __init__(self):
        self.user_service = UserService()

    def login(self, username, password):
        user = self.user_service.login(username, password)
        if user:
            return {"status": "success", "data": user.to_dict()}
        return {"status": "fail", "message": "Invalid credentials"}
