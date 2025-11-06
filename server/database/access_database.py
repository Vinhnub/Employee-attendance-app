import os
import sqlite3
#
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

    def _convert_query(self, query):
        if query == "SELECT * FROM Shift WHERE user_id=? AND strftime('%Y-%m-%d', start_time) = strftime('%Y-%m-%d', 'now')":
            return """SELECT * FROM "Shift" WHERE TO_CHAR(start_time::timestamp, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM') AND user_id = %s"""

        if query == "SELECT * FROM Shift WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now') AND user_id=?":
            return """SELECT * FROM "Shift" WHERE TO_CHAR(start_time::timestamp, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM') AND user_id = %s;"""

        if query == """SELECT UL.id, content, date_time, U.id, U.fullname  FROM UserLog UL INNER JOIN User U ON UL.user_id = U.id
                    WHERE strftime('%Y', datetime(date_time)) = ?
                    AND strftime('%m', datetime(date_time)) = ?
                    AND strftime('%d', datetime(date_time)) = ?
                    """:
            return """SELECT UL.id, content, date_time, U.id, U.fullname
            FROM "UserLog" UL
            INNER JOIN "User" U ON UL.user_id = U.id
            WHERE EXTRACT(YEAR FROM date_time) = %s
            AND EXTRACT(MONTH FROM date_time) = %s
            AND EXTRACT(DAY FROM date_time) = %s;
            """

        if query == """SELECT *
        FROM Shift
        WHERE strftime('%Y-%m', start_time) = strftime('%Y-%m', 'now')
        ORDER BY user_id
        """:
            return """SELECT *
            FROM "Shift"
            WHERE TO_CHAR(start_time::timestamp, 'YYYY-MM') = TO_CHAR(NOW(), 'YYYY-MM')
            ORDER BY user_id;"""

        table = ["UserLog", "User", "Shift"]
        query = query.replace('"', "'")
        query = query.replace("?", "%s")
        for table_name in table:
            if table_name == "User":
                start = 0
                while True:
                    index = query.find(table_name, start)
                    if index == -1:
                        break
                    if index + len(table_name) >= len(query):
                        query = query.replace(table_name, f'"{table_name}"')
                        break
                    if query[index + len(table_name)] != "L":
                        query = query.replace(table_name, f'"{table_name}"')
                    start = index + len(table_name)
            else:
                query = query.replace(table_name, f'"{table_name}"')
        return query

    def execute(self, query, params=None, fetchone=False, fetchall=False):
        conn = self.connect()
        cursor = conn.cursor()
        # convert query to use postgred cloud db
        query = self._convert_query(query)
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

