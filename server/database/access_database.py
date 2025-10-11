import sqlite3

class DatabaseFetcher:
    def __init__(self, db_path="server/database/data.db"):
        self.db_path = db_path

    def connect(self):
        return sqlite3.connect(self.db_path)

    def execute(self, query, params=(), fetchone=False, fetchall=False):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute(query, params)
        result = None
        if fetchone:
            result = cursor.fetchone()
        elif fetchall:
            result = cursor.fetchall()
        conn.commit()
        conn.close()
        return result
    