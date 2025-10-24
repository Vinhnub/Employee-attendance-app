from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from server.dependencies import get_server

auth_router = APIRouter(prefix="/auth", tags=["Auth"])

class LoginRequest(BaseModel):
    username: str
    password: str

class ChangePasswordRequest(BaseModel):
    username: str
    old_password: str
    new_password: str

@auth_router.post("/login")
def login(data: LoginRequest, server_instance=Depends(get_server)):
    try:
        result = server_instance.auth_controller.login(data.username, data.password)
        if result["status"] == "fail":
            raise HTTPException(status_code=401, detail=result["message"])
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@auth_router.post("/change_password", status_code=status.HTTP_200_OK)
def change_password(data: ChangePasswordRequest, server_instance=Depends(get_server)):
    try:
        result = server_instance.auth_controller.change_password(
            data.username, data.old_password, data.new_password
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))



