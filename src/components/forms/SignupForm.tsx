import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SignupUser } from '../../interfaces/userInterface';
import { useSignupMutation } from '../../hooks/useAuth';

const SignUpForm: React.FC = () => {
  const { mutate: signup, status, isError, error } = useSignupMutation();
  const { register, handleSubmit, formState: { errors } } = useForm<SignupUser>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit: SubmitHandler<SignupUser> = (data) => {
    signup(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          id="name"
          {...register("name", { required: "Name is required" })}
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter name"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          id="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format"
            }
          })}
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
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must have at least 8 characters"
              }
            })}
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
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mb-6"
      >
        {status === "pending"? "Signing up..." : "Sign up"}
      </button>
    </form>
  );
};

export default SignUpForm;