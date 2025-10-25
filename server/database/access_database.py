import sqlite3

class DatabaseFetcher:
    def __init__(self, db_path="server/database/data.db"):
        self.db_path = db_path

    def connect(self):
        conn = sqlite3.connect(self.db_path)
        return conn

    def execute(self, query, params=None, fetchone=False, fetchall=False):
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()

        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)

        result = None
        if fetchone:
            result = cursor.fetchone()
        elif fetchall:
            result = cursor.fetchall()

        conn.commit()
        conn.close()
        return result
