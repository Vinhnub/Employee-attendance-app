from server.database.access_database import DatabaseFetcher


test = DatabaseFetcher()
query = "select * from User"
result = test.execute(query, fetchall=True)
print(result)