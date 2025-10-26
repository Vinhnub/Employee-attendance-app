from fastapi import APIRouter, Depends, HTTPException, status
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
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.emp_controller.start_shift(user_id, data.end_time, data.note, server_instance)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.put("/end_shift", status_code=status.HTTP_200_OK)
def end_shift(
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.emp_controller.end_shift(user_id, server_instance)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.put("/edit_shift", status_code=status.HTTP_200_OK)
def start_shift(
    data: EditShiftRequest, 
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        result = server_instance.emp_controller.edit_shift(user_id, data.new_end_time, data.new_note, server_instance)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@employee_router.get("/shifts") #shift in current month
def get_shifts(
    user_id: int = Depends(get_current_user_id),
    server_instance=Depends(get_server)
):
    try:
        return server_instance.emp_controller.get_shifts_of(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))