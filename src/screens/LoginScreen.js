import React, { useState } from 'react';
import './LoginScreen.css';
import SignUpScreen from './SignUpScreen';

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);
  return (
    <div className='loginScreen'>
      <div className='loginScreen__background'>
        <img
          className='loginScreen__logo'
          src="https://download.logo.wine/logo/Netflix/Netflix-Logo.wine.png"
          alt="" />
        
        <button onClick={() => setSignIn(true) } className='loginScreen__button'>SignIn</button>
        <div className='loginScreen__gradient'>
        </div>
        <div className='loginScreen__body'>
          {signIn ? (<SignUpScreen />) : (
          <>
            <h1>Unlimited films, TV programmes and more</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          
            <div className='loginScreen__input'>
              <form>
                <input type='email' placeholder='Email Address' />
                <button onClick={() => setSignIn(true)} className='loginScreen__getStarted'>Get Started</button>
              </form>
            </div>
          </>
) }

        </div>
      </div>
    </div>
  )
}

export default LoginScreen