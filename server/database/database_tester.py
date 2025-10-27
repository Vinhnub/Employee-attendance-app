from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password

test = DatabaseFetcher()
query = "DELETE FROM Shift"
result = test.execute(query)
print(result)