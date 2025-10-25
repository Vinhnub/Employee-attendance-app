from server.models.user import User
from server.database.access_database import DatabaseFetcher
from server.utils.hashing import *

class UserService:
    def __init__(self):
        self.db = DatabaseFetcher()

    def _check_username_exist(self, username):
        query = "SELECT username FROM User"
        row = self.db.execute(query, fetchall=True)
        for _row in row:
            if username == _row[0]: return True
        return False
    
    def _is_manager(self, username):
        query = "SELECT role FROM User WHERE username=?"
        row = self.db.execute(query, (username,), fetchone=True)
        if row:
            return (row[0] == "manager")
        else:
            return False

    def login(self, username, password):
        query = "SELECT * FROM User WHERE username=?"
        row = self.db.execute(query, (username, ), fetchone=True)
        if row:
            return User(*row)
        return None

    def create_user(self, username, password, fullname, role):
        if self._check_username_exist(username):
            return False
        password_hashed = hash_password(password)
        query = "INSERT INTO User (username, password, fullname, role) VALUES (?, ?, ?, ?)"
        self.db.execute(query, (username, password_hashed, fullname, role))
        return True

    def change_password(self, username, old_password, new_password):
        query = "SELECT password FROM User WHERE username=?"
        row = self.db.execute(query, (username,), fetchone=True)
        if verify_password(old_password, row[0]):
            query = "UPDATE User SET password=? WHERE username=?"
            new_password_hashed = hash_password(new_password)
            self.db.execute(query, (new_password_hashed, username))
            return True
        else:
            return None
        
    def reset_password(self, manager_name, username, new_password):
        if self._is_manager(manager_name) is False:
            return False
        
        new_password_hashed = hash_password(new_password)
        query = "UPDATE User SET password=? WHERE username=?"
        self.db.execute(query, (new_password_hashed, username))
        return True
