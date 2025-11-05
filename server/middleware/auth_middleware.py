from fastapi import Request
from fastapi.responses import JSONResponse
from server.utils.jwt_handler import verify_token
from datetime import datetime, timezone
from server.dependencies import get_server

async def auth_middleware(request: Request, call_next, server_instance=get_server()):
    public_paths = ["/auth/login", "/docs", "/openapi.json"]
    token_banned = server_instance.get_token_banned()

    if request.url.path in public_paths:
        response = await call_next(request)
        return response

    authorization = request.headers.get("Authorization")
    if not authorization or not authorization.startswith("Bearer "):
        return JSONResponse(
            status_code=401,
            content={"detail": "Missing or invalid Authorization header"}
        )

    token = authorization.split(" ")[1]

    if token in token_banned:
        return JSONResponse(
            status_code=401,
            content={"detail": "Token was banned"}
        )

    try:
        payload = verify_token(token)
        request.state.user_id = payload.get("user_id")
        request.state.role = payload.get("role")
        request.state.token = token
        expire_time = datetime.fromtimestamp(payload.get("exp"), tz=timezone.utc)
        request.state.expire = expire_time.strftime("%Y-%m-%d %H:%M:%S")

    except Exception as e:
        return JSONResponse(
            status_code=401,
            content={"detail": f"Invalid token: {str(e)}"}
        )

    response = await call_next(request)
    return response
