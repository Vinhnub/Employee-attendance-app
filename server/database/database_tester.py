from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password
from datetime import datetime, timedelta


DatabaseFetcher.init()
test = DatabaseFetcher()

user_ids = [1,2,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22]

start_date = datetime(2025, 11, 1)
end_date = datetime(2025, 11, 8)

for i in range((end_date - start_date).days + 1):
    current = start_date + timedelta(days=i)
    for uid in user_ids:
        query = "INSERT INTO Shift (start_time, end_time, note, user_id) VALUES (?, ?, ?, ?)"
        value = (f"{current:%Y-%m-%d} 08:00:00", f"{current:%Y-%m-%d} 17:00:00", "auto generated", uid)
        test.execute(query, value)

#
# for value in values:
#     test.execute(query, value)
