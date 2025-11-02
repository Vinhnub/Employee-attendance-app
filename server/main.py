from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from server.routes.auth_router import auth_router 
from server.routes.manager_router import manager_router
from server.routes.employee_router import employee_router

from dotenv import load_dotenv
import os

load_dotenv()
SERVER_IP = os.getenv("SERVER_IP")
PORT_TCP = os.getenv("PORT_TCP")


# ---------------------- Config FastAPI ----------------------
app = FastAPI(title="Attendance REST API Server", version="1.0")
app.include_router(auth_router)
app.include_router(manager_router)
app.include_router(employee_router)


origins = [
    "http://26.212.75.55:5173",  
    # "https://your-frontend-domain.com",  # add if deployed later
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,      
    allow_credentials=True,      
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------- Run Server ----------------------
if __name__ == "__main__":
    uvicorn.run(app, host=SERVER_IP, port=int(PORT_TCP))
