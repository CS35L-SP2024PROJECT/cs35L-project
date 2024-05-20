import React from 'react'
import './CSS/LoginSignup.css'

export const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h2>Welcome!</h2>
            <h1>
                Let's create your account
            </h1>
            <div className="loginsignup-field">
                <input type="text" placeholder='Username' />
                <input type="text" placeholder='Email' />
                <input type="text" placeholder='Password' />
            </div>
            <div className="loginsignup-agree">
                <input type="checkbox" name='' id='' />
                <p>By continuing, I agree to the terms of use & privacy.</p>
            </div>
            <button>
                Continue
            </button>
            <p className="loginsignup-login">
                If you already have an account <span>Sign in</span>
            </p>
            
        </div>
    </div>
  )
}
