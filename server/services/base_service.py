from server.database.access_database import DatabaseFetcher
from server.models.user import User

class BaseService:
    def __init__(self):
        self.db = DatabaseFetcher()

    def _get_user_data_by_id(self, user_id):
        query = "SELECT * FROM User WHERE id=?"
        row = self.db.execute(query, (user_id,), fetchone=True)
        if row:
            return User(*row)
        else:
            return False
        
    def _check_username_exist_by_id(self, user_id):
        query = "SELECT username FROM User WHERE id=?"
        row = self.db.execute(query, (user_id,), fetchone=True)
        if row:
            return True
        return False
    
    def _check_username_exist_by_name(self, username):
        query = "SELECT username FROM User WHERE username=?"
        row = self.db.execute(query, (username,), fetchone=True)
        if row:
            return True
        return False
    
    def _is_manager(self, user_id):
        query = "SELECT role FROM User WHERE id=?"
        row = self.db.execute(query, (user_id,), fetchone=True)
        if row:
            return (row[0] == "manager")
        else:
            return False