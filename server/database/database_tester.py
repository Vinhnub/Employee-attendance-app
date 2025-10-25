from server.database.access_database import DatabaseFetcher


test = DatabaseFetcher()
query = "DELETE from User WHERE id >= 3"
result = test.execute(query)
print(result)