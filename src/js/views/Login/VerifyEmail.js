import React from 'react'
import "../../../styles/login.css"

const VerifyEmail = () => {
  return (
   
        <div className='email-wrp'>
        <div className='verifyEmail'>
           <h1>Reset your password</h1>
           <p>
            <strong>Check your email for a link to reset your password. 
            If it doesn’t appear within a few minutes, check your spam folder.</strong>
          </p>
          {/* <h1>Verify your Email Address</h1>
          <p>
            <strong>A Verification email has been sent to</strong><br/>
             your email address
            <span>{currentUser?.email}</span>
          </p>
          <span>Follow the instruction in the email to verify your account</span>        */}
          {/* <button 
            onClick={resendEmailVerification}
            //disabled={timeActive}
          >Resend Email {timeActive && time}</button> */}
        </div>
      </div>
      
  )
}

export default VerifyEmail