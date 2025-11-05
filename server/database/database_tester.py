from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password

test = DatabaseFetcher()
query = 'SELECT * FROM User'
result = test.execute(query, fetchall=True)
print(result)