import asyncio
import websockets
from constants import *
import json

async def main():
    try:
        async with websockets.connect(f"ws://{SERVER_IP}:{PORT_TCP}") as websocket:
            print("Server connected", websocket)
            data = {"key" : "hello"}
            await websocket.send(json.dumps(data))
            response = await websocket.recv()
            print("Received:", json.loads(response))
    except Exception as e:
        print("Lỗi kết nối:", e)
        await asyncio.sleep(1)  

asyncio.run(main())
