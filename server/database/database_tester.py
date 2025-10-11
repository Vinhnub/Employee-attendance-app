from server.database.access_database import DatabaseFetcher


test = DatabaseFetcher()
query = "select * from Shift"
result = test.execute(query=query, fetchall=True)
print(result)