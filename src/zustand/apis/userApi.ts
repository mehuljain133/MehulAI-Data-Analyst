import { AUTH_ENDPOINTS } from './endPoints';
import { post, get } from './apiClient';
import { SignupUser, LoginUser, LoginSignupResponse } from '../../interfaces/userInterface';
import {ApiResponse} from "../../interfaces/globalInterfaces";

type ApiFunction<TInput, TOutput> = (data: TInput) => Promise<ApiResponse<TOutput>>;

export const signupUser:ApiFunction<SignupUser, LoginSignupResponse> = async (data) => {
  return await post(AUTH_ENDPOINTS.SIGNUP, data);
};

export const loginUser:ApiFunction<LoginUser, LoginSignupResponse> = async (data) => {
  return await post(AUTH_ENDPOINTS.LOGIN, data);
};

export const fetchUser = async (token: string):Promise<LoginSignupResponse> => {
  return await get<LoginSignupResponse>(AUTH_ENDPOINTS.GET_USER, token);
};
