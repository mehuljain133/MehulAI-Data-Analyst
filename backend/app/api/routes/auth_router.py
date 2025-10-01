from fastapi import Depends, APIRouter, Request
from app.api.controllers import auth_controller
from app.api.validators.auth_validators import (UserCreate, UserLogin)
from app.dependencies.database import get_db
from app.config.db_config import DB

# instance of APIRouter
auth_router = APIRouter()


@auth_router.post("/signup")
async def signup(user: UserCreate, db: DB = Depends(get_db)):
    return auth_controller.signup(user, db)


@auth_router.post("/login")
async def login(user: UserLogin, db: DB = Depends(get_db)):
    return auth_controller.login(user, db)


@auth_router.get("/")
async def get_user(request: Request, db: DB = Depends(get_db)):
    user_id = request.state.user_id
    return auth_controller.get_user(user_id, db)
