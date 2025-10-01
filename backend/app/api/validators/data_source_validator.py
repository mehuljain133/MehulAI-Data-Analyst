from pydantic import BaseModel


class AddDataSource(BaseModel):
    table_name: str
    source_name: str

    class Config:
        # Use schema_extra for additional metadata in your API docs
        json_schema_extra = {
            "example": {
                "table_name": "Add your table name",
                "source_name": "Add your database link",
            }
        }


class GetSourceTable(BaseModel):
    db_url: str

    class Config:
        # Use schema_extra for additional metadata in your API docs
        json_schema_extra = {
            "example": {
                "db_url": "Add your db url"
            }
        }
