class User:
    def __init__(self, user_id, username, password, fullname, role):
        self._id = user_id
        self.username = username
        self.__password = password
        self.role = role  # "employee" or "manager"
        self.fullname = fullname

    def to_dict(self):
        return {
            "id": self._id,
            "fullname": self.fullname,
            "username": self.username,
            "role": self.role
        }
    
    def get_password(self):
        return self.__password
