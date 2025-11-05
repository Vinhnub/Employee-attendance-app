from server.database.access_database import DatabaseFetcher
from server.utils.hashing import hash_password

test = DatabaseFetcher()
query = "INSERT INTO User (username, password, fullname, role) VALUES (?, ?, ?, ?)"
values = [("huy", hash_password("1"), "Huy", "staff"),
          ("hoang", hash_password("1"), "Hoàng", "staff"),
          ("hao", hash_password("1"), "Hào", "staff"),
          ("thong", hash_password("1"), "Thông", "staff"),
          ("kiet", hash_password("1"), "Kiệt", "staff"),
          ("quan", hash_password("1"), "Quân GM", "manager")]
for value in values:
    test.execute(query, value)
