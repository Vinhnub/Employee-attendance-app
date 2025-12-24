from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager
from server.database.access_database import DatabaseFetcher
from server.routes.auth_router import auth_router 
from server.routes.manager_router import manager_router
from server.routes.employee_router import employee_router
from server.middleware.auth_middleware import auth_middleware
#from server.middleware.logging_middleware import *

from dotenv import load_dotenv
import os

load_dotenv()
SERVER_IP = os.getenv("SERVER_IP")
PORT_TCP = os.getenv("PORT_TCP")


# ---------------------- Config FastAPI ----------------------
@asynccontextmanager
async def lifespan(app: FastAPI):
    yield

    # Shutdown
    DatabaseFetcher.close()

app = FastAPI(lifespan=lifespan)
app.include_router(auth_router)
app.include_router(manager_router)
app.include_router(employee_router)

app.middleware("http")(auth_middleware)
# app.middleware("http")(log_exceptions)


origins = [
    "http://26.212.75.55:5173",
    "http://26.253.176.29:5173",
    "http://192.168.1.5:5173",
    "http://10.12.96.95:5173",
    "http://localhost:5173",
    "http://vinhnub.local:5173",
    "https://employee-attendance-app-wf8c.onrender.com",
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
    uvicorn.run(
        app,
        host=SERVER_IP,
        port=int(PORT_TCP),
        log_config="server/logging.yaml",
        log_level="debug"
    )