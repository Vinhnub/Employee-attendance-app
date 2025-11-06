from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password

test = DatabaseFetcher()
user_id = 4
query = "SELECT * FROM Shift WHERE user_id=? AND strftime('%Y-%m-%d', start_time) = strftime('%Y-%m-%d', 'now')"
result = test.execute(query, (user_id,), fetchall=True)
print(result)