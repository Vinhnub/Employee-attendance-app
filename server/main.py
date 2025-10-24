from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


from server.utils.config import *
from server.services.gsheet_service import *
import uvicorn

from server.routes.auth_router import auth_router 
from server.routes.manager_router import manager_router


# ---------------------- Cấu hình FastAPI ----------------------
app = FastAPI(title="Attendance REST API Server", version="1.0")
app.include_router(auth_router)
app.include_router(manager_router)

# Cho phép CORS (frontend có thể gọi API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------- Request Models ----------------------


class StartShift(BaseModel):
    username : str
    end_time: str


# ---------------------- Run Server ----------------------
if __name__ == "__main__":
    uvicorn.run(app, host=SERVER_IP, port=PORT_TCP)
