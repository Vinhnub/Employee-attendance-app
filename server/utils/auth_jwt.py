from fastapi import Header, HTTPException, status
from server.utils.jwt_handler import verify_token

def get_current_user_id(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Lack of Authorization header"
        )
    
    try:
        token = authorization.split(" ")[1]  
        payload = verify_token(token)
        user_id = payload.get("user_id")
        role = payload.get("role")

        if not user_id:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token does not contain user_id"
            )
        return {"user_id" : user_id, "role" : role}

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Error: {e}"
        )
