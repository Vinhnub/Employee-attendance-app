from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from server.dependencies import get_server
from server.utils.auth_jwt import get_current_user_id

manager_router = APIRouter(prefix="/manager", tags=["Manager"])

class CreateAccountRequest(BaseModel):
    username: str
    password: str
    fullname: str
    role: str

class ResetPasswordRequest(BaseModel):
    new_password: str


@manager_router.post("/create_account", status_code=status.HTTP_200_OK)
def create_account(
    data: CreateAccountRequest,
    user_id: int = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.manager_controller.create_account(
            user_id, data.username, data.password, data.fullname, data.role, server_instance
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@manager_router.put("/users/{id}/reset_password", status_code=status.HTTP_200_OK)
def reset_password(
    id: int,
    data: ResetPasswordRequest, 
    user_id: int = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.manager_controller.reset_password(
            user_id, id, data.new_password
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.delete("/users/{id}", status_code=status.HTTP_200_OK)
def delete_account(
    id: int,
    user_id: int = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.manager_controller.delete_account(
            user_id, id
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/users")
def get_all_users(
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.manager_controller.users(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/users/{id}")
def get_user_by_id(
    id : int,
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.manager_controller.get_data_of(user_id, id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/users/{id}/logs")
def get_log_by_user_id(
    id : int,
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.manager_controller.get_log_by_user_id(user_id, id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/shifts") # get list of shift today
def get_all_shifts_today(
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.manager_controller.get_all_shifts_today(user_id, server_instance)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/logs/{year}/{month}/{day}")  # get logs by date
def get_log_by_day(
    year : int,
    month : int,
    day : int,
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.manager_controller.get_log_by_day(user_id, year, month, day)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))