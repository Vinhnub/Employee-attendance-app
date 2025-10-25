from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from server.dependencies import get_server
from server.utils.auth_jwt import get_current_user_id

employee_router = APIRouter(prefix="/employee", tags=["Employee"])


class StartShiftRequest(BaseModel):
    end_time: str
    note: str


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