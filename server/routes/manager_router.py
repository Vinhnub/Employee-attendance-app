from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from server.dependencies import get_server

manager_router = APIRouter(prefix="/manager", tags=["Manager"])

class CreateAccountRequest(BaseModel):
    manager_name: str
    username: str
    password: str
    fullname: str
    role: str

class ResetPasswordRequest(BaseModel):
    manager_name: str
    username: str
    new_password: str

@manager_router.post("/create_account", status_code=status.HTTP_200_OK)
def create_account(data: CreateAccountRequest, server_instance=Depends(get_server)):
    try:
        result = server_instance.manager_controller.create_account(
            data.manager_name, data.username, data.password, data.fullname, data.role
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@manager_router.post("/reset_password", status_code=status.HTTP_200_OK)
def reset_password(data: ResetPasswordRequest, server_instance=Depends(get_server)):
    try:
        result = server_instance.manager_controller.reset_password(
            data.manager_name, data.username, data.new_password
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))