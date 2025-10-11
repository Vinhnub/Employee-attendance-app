from server.models.user import User
from server.database.access_database import DatabaseFetcher

class UserService:
    def __init__(self):
        self.db = DatabaseFetcher()

    def login(self, username, password):
        query = "SELECT * FROM users WHERE username=? AND password=?"
        row = self.db.execute(query, (username, password), fetchone=True)
        if row:
            return User(*row)
        return None

    def create_user(self, username, password, role):
        query = "INSERT INTO users (username, password, role) VALUES (?, ?, ?)"
        self.db.execute(query, (username, password, role))
