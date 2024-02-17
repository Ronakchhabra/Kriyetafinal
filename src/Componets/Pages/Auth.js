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
      <div className="Login-website-name">
          <h1>SKILLIX </h1>
      </div>
      <div className='Login-app-container' { ...isLoginMode ? 'login-mode' : 'signup-mode'}>
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
                <button type="button" className='Login-btn text-white bg-purple-700 dark:bg-gray-900' onClick={handleToggle}>
  {isLoginMode ? 'Sign up' : 'Login'}
</button>

              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
      <ToastContainer/></>
  );
};

export default Auth;
