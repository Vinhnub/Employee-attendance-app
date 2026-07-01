from server.services.user_service import UserService
from server.services.log_service import LogService
from server.utils.jwt_handler import create_access_token

class AuthController:
    def __init__(self, db):
        self.user_service = UserService(db)
        self.log_service = LogService(db)

    def me(self, user_id, server):
        user = self.user_service.me(user_id)

        if user:
            user_data = user.to_dict()
            if user_data["id"] in server.get_staff_on_working():
                current_shift = server.get_staff_on_working()[user_data["id"]]
            else:
                current_shift = None

            return {
                    "status" : "success",
                    "message" : "Successful",
                    "current_shift": current_shift,
                    "data" : user.to_dict()
            }
        else:
            return {
                    "status" : "fail",
                    "message" : "Something is wrong"
            }

    def login(self, username, password, server):
        result = self.user_service.login(username, password)
        if not result:
            return {
                "status": "fail",
                "message": "Sai tài khoản hoặc mật khẩu"
            }

        user_data = result.to_dict()
        user_id = user_data["id"]
        role = user_data["role"]

        access_token = create_access_token({"user_id": user_id, "role" : role})

        if user_data["id"] in server.get_staff_on_working():
            current_shift = server.get_staff_on_working()[user_data["id"]]
        else:
            current_shift = None

        self.log_service.write_log(f"Đăng nhập", user_data["id"])
        return {
            "status": "success",
            "message": "Đăng nhập thành công",
            "data": user_data,
            "current_shift": current_shift,
            "access_token": access_token
        }

    def logout(self, user_id, role, token, expire, server_instance):
        token_banned = server_instance.get_token_banned()
        token_banned[token] = expire
        return {
            "status": "success",
            "message": "Đăng xuất thành công"
        }

    def change_password(self, user_id, old_password, new_password):
        result = self.user_service.change_password(user_id, old_password, new_password)

        if result:
            self.log_service.write_log("Đổi mật khẩu", user_id)
            return {
                "status": "success",
                "message": "Đổi mật khẩu thành công"
            }
        else:
            return {
                "status": "fail",
                "message": "Sai mật khẩu cũ"
            }
