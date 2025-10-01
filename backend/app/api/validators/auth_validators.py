# app/api/validators/user.py

from pydantic import BaseModel, EmailStr, constr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: constr(min_length=6)  # type: ignore # Minimum password length

    class Config:
        # Use schema_extra for additional metadata in your API docs
        json_schema_extra = {
            "example": {
                "name": "user name",
                "email": "user@example.com",
                "password": "strongpassword123"
            }
        }


class UserLogin(BaseModel):
    email: EmailStr
    password: str
