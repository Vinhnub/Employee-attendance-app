import os
import sqlite3
from threading import Lock

class DatabaseFetcher:
    _conn = None
    _lock = Lock()

    @staticmethod
    def init(path="server/database/data.db"):
        if DatabaseFetcher._conn is None:
            with DatabaseFetcher._lock:
                if DatabaseFetcher._conn is None:
                    DatabaseFetcher._conn = sqlite3.connect(path, check_same_thread=False)
                    DatabaseFetcher._conn.execute("PRAGMA foreign_keys = ON;")
                    DatabaseFetcher._conn.row_factory = sqlite3.Row
                    print("Database connection initialized")
        return DatabaseFetcher._conn

    @staticmethod
    def get():
        if DatabaseFetcher._conn is None:
            raise RuntimeError("Database not initialized")
        return DatabaseFetcher._conn

    @staticmethod
    def execute(query, params=None, fetchone=False, fetchall=False):
        conn = DatabaseFetcher.get()
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
        return result

    @staticmethod
    def close():
        if DatabaseFetcher._conn:
            DatabaseFetcher._conn.close()
            DatabaseFetcher._conn = None
            print("Database connection closed")


# import psycopg2
# from dotenv import load_dotenv
# from psycopg2.extras import RealDictCursor
#
# load_dotenv()
# DATABASE_URL = os.getenv("DATABASE_URL")
#
# class DatabaseFetcher:
#     def __init__(self, db_url=DATABASE_URL):
#         self.db_url = db_url
#
#     @staticmethod
#     def init():
#         pass
#
#     @staticmethod
#     def close():
#         pass
#
#     def connect(self):
#         return psycopg2.connect(self.db_url)
#
#     def _convert_query(self, query):
#         if query == "SELECT * FROM Shift WHERE user_id=? AND strftime('%Y-%m-%d', start_time) = strftime('%Y-%m-%d', 'now')":
#             return """SELECT * FROM "Shift" WHERE TO_CHAR(start_time::timestamp, 'YYYY-MM-DD') = TO_CHAR(NOW(), 'YYYY-MM-DD') AND user_id = %s"""
#
#         if query == "SELECT * FROM Shift WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') AND user_id=?":
#             return """SELECT * FROM "Shift" WHERE TO_CHAR(start_time::timestamp, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM') AND user_id = %s;"""
#
#         if query == """SELECT UL.id, content, date_time, U.id, U.fullname  FROM UserLog UL INNER JOIN User U ON UL.user_id = U.id
#         WHERE strftime('%Y', datetime(date_time)) = ?
#         AND strftime('%m', datetime(date_time)) = ?
#         AND strftime('%d', datetime(date_time)) = ?
#         """:
#             return """SELECT UL.id, content, date_time, U.id, U.fullname
#             FROM "UserLog" UL
#             INNER JOIN "User" U ON UL.user_id = U.id
#             WHERE EXTRACT(YEAR FROM date_time::timestamp) = %s
#             AND EXTRACT(MONTH FROM date_time::timestamp) = %s
#             AND EXTRACT(DAY FROM date_time::timestamp) = %s;
#             """
#
#         if query == """SELECT S.id, S.start_time, S.end_time, S.note, S.user_id FROM Shift S INNER JOIN User U ON S.user_id = U.id WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') ORDER BY user_id""":
#             return """SELECT S.id, S.start_time, S.end_time, S.note, S.user_id
#             FROM "Shift" S
#             INNER JOIN "User" U ON S.user_id = U.id
#             WHERE TO_CHAR(S.start_time::timestamp, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
#             ORDER BY S.user_id;"""
#
#         table = ["UserLog", "User", "Shift"]
#         query = query.replace('"', "'")
#         query = query.replace("?", "%s")
#         for table_name in table:
#             if table_name == "User":
#                 start = 0
#                 while True:
#                     index = query.find(table_name, start)
#                     if index == -1:
#                         break
#                     if index + len(table_name) >= len(query):
#                         query = query.replace(table_name, f'"{table_name}"')
#                         break
#                     if query[index + len(table_name)] != "L":
#                         query = query.replace(table_name, f'"{table_name}"')
#                     start = index + len(table_name)
#             else:
#                 query = query.replace(table_name, f'"{table_name}"')
#         return query
#
#     def execute(self, query, params=None, fetchone=False, fetchall=False):
#         conn = self.connect()
#         cursor = conn.cursor()
#         # convert query to use postgred cloud db
#         query = self._convert_query(query)
#         try:
#             if params:
#                 cursor.execute(query, params)
#             else:
#                 cursor.execute(query)
#
#             result = None
#
#             if fetchone:
#                 result = cursor.fetchone()
#             elif fetchall:
#                 result = cursor.fetchall()
#
#             conn.commit()
#             return result
#
#         except Exception as e:
#             print("Database error:", e)
#             conn.rollback()
#             raise e
#
#         finally:
#             cursor.close()
#             conn.close()
#
