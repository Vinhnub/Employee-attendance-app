from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password

test = DatabaseFetcher()
query = "INSERT INTO User (username, password, fullname, role) VALUES (?, ?, ?, ?)"
result = test.execute(query, ('admin', hash_password('admin123'), 'Chủ Quán', 'manager'))
print(result)