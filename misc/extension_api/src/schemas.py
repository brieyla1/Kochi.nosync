from pydantic import BaseModel


class AuthDetails(BaseModel):
    username: str
    password: str


class AddDetails(BaseModel):
    website: str