from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
from server.utils.jwt_handler import verify_token

async def auth_middleware(request: Request, call_next):
    public_paths = ["/auth/login", "/docs", "/openapi.json"]

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
    try:
        payload = verify_token(token)
        request.state.user_id = payload.get("user_id")
        request.state.role = payload.get("role")
    except Exception as e:
        return JSONResponse(
            status_code=401,
            content={"detail": f"Invalid token: {str(e)}"}
        )

    response = await call_next(request)
    return response
