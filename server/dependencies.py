from server.database.access_database import DatabaseFetcher
from server.server_instance import Server

server = None

def get_server():
    global server

    if server is None:
        DatabaseFetcher.init()
        server = Server(DatabaseFetcher())

    return server