from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks, Request
from pydantic import BaseModel
from server.dependencies import get_server

manager_router = APIRouter(prefix="/manager", tags=["Manager"])

class CreateAccountRequest(BaseModel):
    username: str
    password: str
    fullname: str
    role: str

class ResetPasswordRequest(BaseModel):
    new_password: str

class EditShiftRequestManager(BaseModel):
    new_start_time: str
    new_note: str

@manager_router.post("/create_account", status_code=status.HTTP_200_OK)
def create_account(
    data: CreateAccountRequest,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role

        result = server_instance.manager_controller.create_account(
            user_id, role, data.username, data.password, data.fullname, data.role, server_instance
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@manager_router.get("/users")
def get_all_users(
        request: Request,
        server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role

        return server_instance.manager_controller.users(user_id, role)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@manager_router.delete("/users/{target_id}", status_code=status.HTTP_200_OK)
def delete_account(
    target_id: str,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        result = server_instance.manager_controller.delete_account(
            user_id, role, target_id
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    
@manager_router.get("/users/{target_id}")
def get_user_by_id(
    target_id : str,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        return server_instance.manager_controller.get_data_of(user_id, role, target_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@manager_router.put("/users/{target_id}/reset_password", status_code=status.HTTP_200_OK)
def reset_password(
        target_id: str,
        data: ResetPasswordRequest,
        request: Request,
        server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role

        result = server_instance.manager_controller.reset_password(
            user_id, role, target_id, data.new_password
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@manager_router.get("/users/{target_id}/shifts") # get all shifts of user in current month
def get_all_shifts_current_month(
    target_id : str,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        return server_instance.manager_controller.get_shifts_of(user_id, role, target_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.put("/users/{target_id}/shifts/{shift_id}/edit_shift") # edit the shift which have id = shift_id
def edit_shift_by_manager(
    target_id : str,
    shift_id : str,
    background_tasks : BackgroundTasks,
    data: EditShiftRequestManager,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        shift_id = int(shift_id)
        result = server_instance.manager_controller.edit_shift(user_id, role, int(target_id), shift_id, data.new_start_time, data.new_note, server_instance.get_staff_on_working())
        if result["status"] == "success":
            background_tasks.add_task(server_instance.manager_controller.refresh_sheet, user_id, role, server_instance)
        return result

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/users/{target_id}/logs")
def get_log_by_user_id(
    target_id : str,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        return server_instance.manager_controller.get_log_by_user_id(user_id, role, target_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/shifts") # get list of shift today
def get_all_shifts_today(
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        
        return server_instance.manager_controller.get_all_shifts_today(user_id, role, server_instance)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.put("/shifts/{target_id}/end_shift") # end shift which have id = {id}
def end_shift_id(
    target_id : str,
    background_tasks : BackgroundTasks,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        target_id = int(target_id)
        result =  server_instance.manager_controller.end_shift_id(target_id, user_id, role)
        if result["status"] == "success":
            background_tasks.add_task(server_instance.emp_controller.update_data, result["staff_id"], server_instance, result["time_delta"])
        return result   
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@manager_router.get("/logs/{year}/{month}/{day}")  # get logs by date
def get_log_by_day(
    year : str,
    month : str,
    day : str,
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        
        return server_instance.manager_controller.get_log_by_day(user_id, role, year, month, day)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@manager_router.put("/refresh_sheet")
def refresh_sheet(
    request: Request,
    server_instance=Depends(get_server)
):
    try:
        user_id = request.state.user_id
        role = request.state.role
        return server_instance.manager_controller.refresh_sheet(user_id, role, server_instance)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))