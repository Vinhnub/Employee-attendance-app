import sys
from fastapi import FastAPI, Request
import traceback
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)

logging.getLogger("urllib3").setLevel(logging.WARNING)
logging.getLogger("googleapiclient").setLevel(logging.WARNING)
logging.getLogger("uvicorn.access").setLevel(logging.INFO)
logging.getLogger("uvicorn.error").setLevel(logging.DEBUG)
logging.getLogger("fastapi").setLevel(logging.DEBUG)


logger = logging.getLogger(__name__)

app = FastAPI()

@app.middleware("http")
async def log_exceptions(request: Request, call_next):
    try:
        response = await call_next(request)
        print(dir(response))
        return response
    except Exception as e:
        logger.error("Exception: %s", e, exc_info=True)
        traceback.print_exc()
        raise e