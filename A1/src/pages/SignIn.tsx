import React, { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'


import InputText from '../components/InputText';

function SignIn() {
    // State to hold the email value
    const [email, setEmail] = useState('');

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    }
    
    // State to hold the password value
    const [password, setPassword] = useState('');

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    }

    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Email: ", email);
        console.log("Password: ", password);
        // Additional submit logic here
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="w-full">
            <h2 className="text-center text-3xl font-semibold text-zinc-900">Welcome back</h2>
            <p className="mt-2 text-center text-sm text-zinc-600">
              Log in to your SOIL account
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <InputText name='Email' type='email' autoComplete='email' required={true} placeholder='Email' onChange={handleEmailChange}/>
            <InputText name='Password' type='password' autoComplete='password' required={true} placeholder='Password' onChange={handlePasswordChange}/>
  
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <ChakraLink as={ReactRouterLink} to='/' className="font-medium text-green-600 hover:text-green-700">Forgot password?</ChakraLink>
              </div>
            </div>
  
            <div className="flex items-center justify-end">
                <button type="button" className="mx-2 my-auto bg-gray-200 px-3 py-1.5 rounded-xl font-semibold">
                    <ChakraLink as={ReactRouterLink} to='/'>Cancel</ChakraLink>
                </button>
                <button
                    type="submit"
                    className="mx-2 my-auto px-3 py-1.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700"
                    onClick={handleSubmit}>
                    Log in
                </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default SignIn;
