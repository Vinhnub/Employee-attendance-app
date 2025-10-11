from server.services.shift_service import ShiftService
from server.services.user_service import UserService

class ManagerController:
    def __init__(self):
        self.shift_service = ShiftService()
        self.user_service = UserService()

    
