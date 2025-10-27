from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from pydantic import BaseModel
from server.dependencies import get_server
from server.utils.auth_jwt import get_current_user_id

employee_router = APIRouter(prefix="/employee", tags=["Employee"])


class StartShiftRequest(BaseModel):
    end_time: str
    note: str

class EditShiftRequest(BaseModel):
    new_end_time: str
    new_note: str

@employee_router.post("/start_shift", status_code=status.HTTP_200_OK)
def start_shift(
    data: StartShiftRequest, 
    background_tasks : BackgroundTasks,
    user = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        user_id = user["user_id"]
        role = user["role"]
        
        result = server_instance.emp_controller.start_shift(user_id, role, data.end_time, data.note, server_instance)
        if result["status"] == "success":
            background_tasks.add_task(server_instance.emp_controller.update_data, user_id, server_instance, result["result"])
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.put("/end_shift", status_code=status.HTTP_200_OK)
def end_shift(
    background_tasks : BackgroundTasks,
    user = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        user_id = user["user_id"]
        role = user["role"]
        
        result = server_instance.emp_controller.end_shift(user_id, role, server_instance)
        if result["status"] == "success":
            background_tasks.add_task(server_instance.emp_controller.update_data, user_id, server_instance, result["result"])
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.put("/edit_shift", status_code=status.HTTP_200_OK)
def edit_shift(
    data: EditShiftRequest, 
    background_tasks : BackgroundTasks,
    user = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        user_id = user["user_id"]
        role = user["role"]
        
        result = server_instance.emp_controller.edit_shift(user_id, role, data.new_end_time, data.new_note, server_instance)
        if result["status"] == "success":
            background_tasks.add_task(server_instance.emp_controller.update_data, user_id, server_instance, result["result"])
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.get("/shifts") #shift in current month
def get_shifts(
    user = Depends(get_current_user_id), 
    server_instance=Depends(get_server)
):
    try:
        user_id = user["user_id"]
        role = user["role"]
        
        return server_instance.emp_controller.get_shifts_of(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))