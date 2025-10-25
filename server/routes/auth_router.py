from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from server.dependencies import get_server
from server.utils.auth_jwt import get_current_user_id
from server.models.user import User

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str

@auth_router.get("/me")
def login(
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.auth_controller.me(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@auth_router.post("/login")
def login(
    data: LoginRequest, 
    server_instance=Depends(get_server)
):
    try:
        return server_instance.auth_controller.login(data.username, data.password, server_instance)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@auth_router.post("/change_password", status_code=status.HTTP_200_OK)
def change_password(
    data: ChangePasswordRequest,
    user_id: int = Depends(get_current_user_id),  
    server_instance=Depends(get_server)
):
    try:
        return server_instance.auth_controller.change_password(
            user_id, data.old_password, data.new_password
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    

