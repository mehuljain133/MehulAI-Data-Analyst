from fastapi import HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from app.api.db.user import User
from app.api.validators.auth_validators import (UserCreate, UserLogin)
from app.utils.auth_utils import (
    get_password_hash, verify_password, create_access_token)
from app.config.logging_config import get_logger
from app.config.db_config import DB
from app.utils.response_utils import create_response

logger = get_logger(__name__)


def signup(user: UserCreate, db: DB):
    try:
        session = db.create_session()
        # Check if the user already exists
        existing_user = session.execute(select(User).where(
            User.email == user.email)).scalar_one_or_none()
        if existing_user:
            return JSONResponse(status_code=400, content=create_response(
                status_code=400,
                message="Email already registered",
                data={}
            ))
        # Insert the new user
        user_instance = User(
            name=user.name,
            email=user.email,
            hashed_password=get_password_hash(user.password)
        )

        session.add(user_instance)
        session.commit()
        session.refresh(user_instance)

        # Generate JWT token for the new user
        token_data = {
            "id": user_instance.id
        }
        access_token = create_access_token(data=token_data)

        # Return a success response
        return JSONResponse(status_code=201, content=create_response(
            status_code=201,
            message="User created successfully",
            data={
                "user_id": user_instance.id,
                "name": user_instance.name,
                "email": user_instance.email,
                "access_token": access_token,
            }
        ))

    except SQLAlchemyError as e:
        # Catch SQL-related errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Database error",
            data={"error": str(e)}
        ))

    except Exception as e:
        # Catch all other errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Something went wrong",
            data={"error": str(e)}
        ))


def login(user: UserLogin, db: DB):
    try:
        session = db.create_session()
        # Find the user by email
        db_user = session.execute(select(User).where(
            User.email == user.email)).scalar_one_or_none()

        # If user does not exist
        if not db_user:
            return JSONResponse(status_code=404, content=create_response(
                status_code=404,
                message="User not found",
                data={}
            ))

        # Verify password
        if not verify_password(user.password, db_user.hashed_password):
            return JSONResponse(status_code=400, content=create_response(
                status_code=400,
                message="Incorrect password",
                data={}
            ))

        # Generate JWT token
        token_data = {"id": db_user.id}
        access_token = create_access_token(data=token_data)

        # Return success response with the token
        return JSONResponse(status_code=200, content=create_response(
            status_code=200,
            message="Login successful",
            data={
                "user_id": db_user.id,
                "name": db_user.name,
                "email": db_user.email,
                "access_token": access_token,
            }
        ))

    except SQLAlchemyError as e:
        # Catch SQL-related errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Database error",
            data={"error": str(e)}
        ))

    except Exception as e:
        # Catch all other errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Something went wrong",
            data={"error": str(e)}
        ))


def get_user(id: int,  db: DB):
    try:
        session = db.create_session()
        # Fetch the user from the database using the email
        db_user = session.execute(select(User).where(
            User.id == id)).scalar_one_or_none()

        if not db_user:
            return JSONResponse(status_code=404, content=create_response(
                status_code=404,
                message="User not found",
                data={}
            ))

        # Return the user
        return JSONResponse(status_code=200, content=create_response(
            status_code=200,
            message="User fetched successful",
            data={
                "user_id": db_user.id,
                "name": db_user.name,
                "email": db_user.email,
            }
        ))

    except SQLAlchemyError as e:
        # Catch SQL-related errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Database error",
            data={"error": str(e)}
        ))

    except Exception as e:
        # Catch all other errors and raise HTTP exception
        return JSONResponse(status_code=500, content=create_response(
            status_code=500,
            message="Something went wrong",
            data={"error": str(e)}
        ))