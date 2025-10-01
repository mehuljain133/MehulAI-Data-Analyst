
export interface ApiResponse<T> {
    status_code: number;
    message: string;
    data: T;
  }

export interface ChatParams {
    data_source_id: string;
  }
  