from server.models.user import User
from server.database.access_database import DatabaseFetcher
from server.utils.hashing import *
from server.services.base_service import BaseService

class UserService(BaseService):
    def __init__(self):
        self.db = DatabaseFetcher()
        
    def me(self, user_id):
        result = self._get_user_data_by_id(user_id)
        return result

    def login(self, username, password):
        query = "SELECT * FROM User WHERE username=?"
        row = self.db.execute(query, (username,), fetchone=True)
        if row:
            user = User(*row)
            if verify_password(password, user.get_password()):
                return user
        return False
    
    def change_password(self, user_id, old_password, new_password):
        if not self._check_username_exist_by_id(user_id):
            return False
        query = "SELECT password FROM User WHERE id=?"
        row = self.db.execute(query, (user_id,), fetchone=True)
        if verify_password(old_password, row[0]):
            query = "UPDATE User SET password=? WHERE id=?"
            new_password_hashed = hash_password(new_password)
            self.db.execute(query, (new_password_hashed, user_id))
            return True
        else:
            return False

    def create_user(self, user_id, username, password, fullname, role):
        if self._check_username_exist_by_name(username) or (not self._is_manager(user_id)):
            return False
        password_hashed = hash_password(password)
        query = "INSERT INTO User (username, password, fullname, role) VALUES (?, ?, ?, ?)"
        self.db.execute(query, (username, password_hashed, fullname, role))
        return True

        
    def reset_password(self, user_id, username, new_password):
        if (not self._is_manager(user_id)) or (not self._check_username_exist_by_name(username)):
            return False
    
        new_password_hashed = hash_password(new_password)
        query = "UPDATE User SET password=? WHERE username=?"
        self.db.execute(query, (new_password_hashed, username))
        return True
