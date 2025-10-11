import asyncio
import websockets
import json
import threading
from server.utils.config import *
from server.utils.gsheet_service import *
from server.controllers.auth_controller import AuthController
from server.controllers.employee_controller import EmployeeController


class Server:
    def __init__(self):
        self.sheet = GGSheet()
        self.auth_controller = AuthController()
        self.emp_controller = EmployeeController()
        asyncio.run(self.start_server())
        
    async def handle_client(self, websocket):
        print("New client connected")
        try:
            async for msg in websocket:
                data = json.loads(msg)
                self.sheet.update_cell(1, 1, data["key"])
                data_response = {"data" : f"hello from server! {data["key"]}"}
                await websocket.send(json.dumps(data_response))

        except websockets.exceptions.ConnectionClosed:
            print(f"Client disconnected.")  

    async def start_server(self):
        try:
            async with websockets.serve(self.handle_client, SERVER_IP, PORT_TCP):
                print('Websockets Server Started')
                await asyncio.Future()
        except:
            pass
        finally:
            asyncio.run(self.start_server())

    
o_server = Server()
