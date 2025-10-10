import asyncio
import websockets
import json
import threading
from config import *
from google_sheet import *

class Server:
    def __init__(self):
        self.sheet = GGSheet()
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
