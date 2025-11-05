import os
import sqlite3

# class DatabaseFetcher:
#     def __init__(self, db_path="server/database/data.db"):
#         self.db_path = db_path
#
#     def connect(self):
#         conn = sqlite3.connect(self.db_path)
#         return conn
#
#     def execute(self, query, params=None, fetchone=False, fetchall=False):
#         conn = sqlite3.connect(self.db_path)
#         cursor = conn.cursor()
#
#         if params:
#             cursor.execute(query, params)
#         else:
#             cursor.execute(query)
#
#         result = None
#         if fetchone:
#             result = cursor.fetchone()
#         elif fetchall:
#             result = cursor.fetchall()
#
#         conn.commit()
#         conn.close()
#         return result

import psycopg2
from dotenv import load_dotenv
from psycopg2.extras import RealDictCursor

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

class DatabaseFetcher:
    def __init__(self, db_url=DATABASE_URL):
        self.db_url = db_url

    def connect(self):
        return psycopg2.connect(self.db_url)

    def execute(self, query, params=None, fetchone=False, fetchall=False):
        conn = self.connect()
        cursor = conn.cursor()
        table = ["UserLog", "User", "Shift"]
        query = query.replace('"', "'")
        query = query.replace("?", "%s")
        for table_name in table:
            if query.find(table_name) != -1:
                query = query.replace(table_name, f'"{table_name}"')
                break
        try:
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
            return result

        except Exception as e:
            print("Database error:", e)
            conn.rollback()
            raise e

        finally:
            cursor.close()
            conn.close()

