import {useEffect} from 'react'
import {useNavigate } from 'react-router-dom';
import ai_analyst_img from '../assets/ai_analyst_banner.jpeg';
import { useState } from 'react'
import LoginForm from '../components/forms/LoginForm';
import SignUpForm from '../components/forms/SignupForm';
import { getUser } from '../utils/localstorageUtils';

export default function Auth() {
  const [component, setComponent] = useState("login")
  const navigate = useNavigate();
  const isAuthenticated = getUser();

  useEffect(() => {
     if(isAuthenticated?.access_token){
      navigate('/data-sources')
    }
  }, [])
  
  
  return (
    <div className="flex h-screen">
      {/* Left side - Background Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src={ai_analyst_img}
          alt="Lighthouse and sailboat"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Mehul</h1>
          <h2 className="text-2xl font-semibold mb-8 text-gray-700">{component == "login" ? "Nice to see you again":"Create an account"}</h2>
          {
            component == "login" ? <LoginForm/> : <SignUpForm/>
          }
          <p className="text-center text-sm text-gray-600">
            {component == "login"?"Don't have an account?":"Already have an account?"}{' '}
            <button onClick={() => setComponent(component == "login"?"signup":"login")} className="font-medium text-blue-600 hover:text-blue-500">
              {component == "login" ? "Sign up now":"Sign in now" }
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}