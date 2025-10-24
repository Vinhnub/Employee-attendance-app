from server.server import Server 

server_instance = Server()

# Dependency để inject vào route
def get_server():
    return server_instance