export interface User {
    user_id: number;
    name: string;
    email: string;
    access_token:string
  }

  export interface SignupUser {
    name: string;
    email: string;
    password: string;
  }
  export interface LoginSignupResponse {
    user_id: number;
    name: string;
    email: string;
    access_token:string
  }

  export interface LoginUser {
    email: string;
    password: string;
  }
  