// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { SignupUser, LoginUser, LoginSignupResponse, User } from "../interfaces/userInterface";
import {ApiResponse} from "../interfaces/globalInterfaces";
import { signupUser, loginUser } from "../zustand/apis/userApi";
import { AxiosError } from 'axios';
import userStore from '../zustand/stores/userStore';
import { saveUser } from '../utils/localstorageUtils';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ErrorResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; 
}

export const useSignupMutation = () => {
  const navigate = useNavigate();
  const setUser = userStore((state) => state.setUser);
  return useMutation<ApiResponse<LoginSignupResponse>, AxiosError<ErrorResponse>, SignupUser>({
    mutationFn: signupUser,
    onSuccess: (response) => {
      const data: User = response.data;
      setUser(data);
      saveUser(data);
      navigate('/data-sources');
      toast.success(`Welcome to MEHUL ${data.name}`);
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

export const useLoginMutation = () => {
  const setUser = userStore((state) => state.setUser);
  const navigate = useNavigate();

  return useMutation<ApiResponse<LoginSignupResponse>, AxiosError<ErrorResponse>, LoginUser>({
    mutationFn: loginUser,
    onSuccess: (response) => {
      const data: User = response.data;
      setUser(data);
      saveUser(data);
      navigate('/data-sources');
      toast.success(`Welcome back ${data.name}`);
    },
    onError: (error) => {
      console.log(error.response?.data);
    },
  });
};

// export const useFetchUser = (token: string) => {

// };