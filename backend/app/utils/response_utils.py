from typing import Any, Dict, Optional

def create_response(status_code: int, message: str, data: Optional[Any] = None) -> Dict[str, Any]:
    response = {
        "status_code": status_code,
        "message": message,
        "data": data if data is not None else {}
    }
    return response