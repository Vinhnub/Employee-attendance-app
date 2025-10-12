import asyncio
import websockets
import json
import threading
from server.utils.config import *
from server.utils.gsheet_service import *
from server.controllers.auth_controller import AuthController
from server.controllers.employee_controller import EmployeeController
from server.controllers.manager_controller import ManagerController


class Server:
    def __init__(self):
        self.sheet = GGSheet()
        self.auth_controller = AuthController()
        self.emp_controller = EmployeeController()
        self.manager_controller = ManagerController()
        self.emp_onworking = {}
        asyncio.run(self.start_server())

    def automatic_end_working(self):
        pass
        
    async def handle_client(self, websocket):
        client_ip, client_port = websocket.remote_address
        print(f"🌐 New client connected: {client_ip}:{client_port}")

        try:
            async for msg in websocket:
                data = json.loads(msg)
                print(data)

                if data["type"] == "login":
                    data_response = self.auth_controller.login(data["params"]["username"], data["params"]["password"])

                if data["type"] == "change_password":
                    data_response = self.auth_controller.change_password(data["params"]["username"], data["params"]["old_password"], data["params"]["new_password"])

                if data["type"] == "create_account":
                    data_response = self.manager_controller.create_account(data["params"]["username"],data["params"]["password"], data["params"]["fullname"], data["params"]["role"])
                
                if data["type"] == "reset_password":
                    data_response = self.manager_controller.reset_password(data["params"]["manager_name"], data["params"]["username"], data["params"]["new_password"])

                print(data_response)
                await websocket.send(json.dumps(data_response))

        except websockets.exceptions.ConnectionClosed:
            print(f"Client disconnected.")  

    async def start_server(self):
        try:
            threading.Thread(target=self.automatic_end_working, daemon=True).start()
            async with websockets.serve(self.handle_client, SERVER_IP, PORT_TCP):
                print('Websockets Server Started')
                await asyncio.Future()
        except Exception as e:
            print(e)
        finally:
            pass

    
o_server = Server()
