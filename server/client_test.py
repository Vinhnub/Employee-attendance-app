import asyncio
import websockets
import json

SERVER_URI = "ws://192.168.1.6:5555"  # thay bằng IP/PORT trong config nếu khác

async def client():
    async with websockets.connect(SERVER_URI) as websocket:
        print("✅ Connected to server!")

        # Gửi dữ liệu test
        data = {"type": "create_account", "params" : {"username" : "admin", "password" : "vinh1255", "fullname" : "Nguyễn Văn Vinh", "role" : "manager"}}
        await websocket.send(json.dumps(data))
        print(f"➡️ Sent: {data}")

        # Nhận phản hồi
        response = await websocket.recv()
        print(f"⬅️ Received: {response}")

asyncio.run(client())
