import asyncio
import websockets
import json

SERVER_URI = "ws://10.13.11.52:5555"  # thay bằng IP/PORT trong config nếu khác

async def client():
    async with websockets.connect(SERVER_URI) as websocket:
        print("✅ Connected to server!")

        # Gửi dữ liệu test
        data = {"type": "reset_password", "params" : {"manager_name" : "admin", "username" : "staff01", "new_password" : "vinh1255"}}
        await websocket.send(json.dumps(data))
        print(f"➡️ Sent: {data}")

        # Nhận phản hồi
        response = await websocket.recv()
        print(f"⬅️ Received: {response}")

asyncio.run(client())
