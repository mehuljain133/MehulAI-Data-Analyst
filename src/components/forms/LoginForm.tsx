import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye,FaEyeSlash } from "react-icons/fa";
import { LoginUser } from '../../interfaces/userInterface';
import { useLoginMutation } from '../../hooks/useAuth';

const LoginForm: React.FC = () => {

  const { mutate: login,status, isError, error } = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false)
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginUser>();

  const onSubmit: SubmitHandler<LoginUser> = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          {...register("email", { 
            required: "Email is required", 
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          type="text"
          id="email"
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter email"
        />
        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters"
              }
            })}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FaEye className="h-5 w-5 text-gray-400"/>
            ) : (
              <FaEyeSlash className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
        {isError && <p className="mt-1 text-sm text-red-600">
        {error.response?.data?.message || 'An unexpected error occurred'}
        </p>}
      </div>

      <button
        type="submit"
        disabled={status === "pending"}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6 disabled:opacity-50"
      >
        {status === "pending" ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
};

export default LoginForm;