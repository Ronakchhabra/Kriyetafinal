import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import './Auth.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
  const [isChecked, setChecked] = useState(false);
  const [isLoginMode, setLoginMode] = useState(true);

  const handleToggle = () => {
    setChecked(!isChecked);
    setLoginMode(!isLoginMode);
  };

  return (
    <>
      <div className='Login-main'>
        <div className="flex flex-col Login-website-name">
          <div className='mb-4 text-purple-700 text-8xl'>Skillix.... </div>
          <div className='text-2xl text-white'>"An Open-source Learning Platorm"</div>
        </div>
        <div className='Login-app-container' {...isLoginMode ? 'login-mode' : 'signup-mode'}>
          <div className='Login-card'>
            <div className={`Login-container `}>

              <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
              {isLoginMode ? (
                <>
                  <LoginForm />
                </>
              ) : (
                <SignUpForm />
              )}

              <div className="Login-additional-options">
                <h4>
                  {isLoginMode
                    ? "Don't have an account? "
                    : 'Already have an account? '}
                  <button type="button" className='text-white bg-purple-700 Login-btn dark:bg-purple-700' onClick={handleToggle}>
                    {isLoginMode ? 'Sign up' : 'Login'}
                  </button>

                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /></>
  );
};

export default Auth;
