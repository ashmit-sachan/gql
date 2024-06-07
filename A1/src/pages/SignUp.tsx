import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'


import InputText from '../components/InputText';

function SignUp() {
    // State to hold the email value
    const [name, setName] = useState('');

    const handleNameChange = (newName: string) => {
        setName(newName);
    }
    
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
    
    // State to hold the confirm password value
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirmPasswordChange = (newConfirmPassword: string) => {
        setConfirmPassword(newConfirmPassword);
    }

    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("Name: ", name);
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Confirm Password: ", confirmPassword);
        // Additional submit logic here
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="w-full">
            <h2 className="text-center text-3xl font-semibold text-zinc-900">Create an Account</h2>
            <p className="mt-2 text-center text-sm text-zinc-600">
              Join SOIL to get the best organic produce
            </p>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <InputText name='Name' type='text' required={true} placeholder='Name' onChange={handleNameChange}/>
            <InputText name='Email' type='email' autoComplete='email' required={true} placeholder='Email' onChange={handleEmailChange}/>
            <InputText name='Password' type='password' autoComplete='password' required={true} placeholder='Password' onChange={handlePasswordChange}/>
            <InputText name='Confirm Password' type='password' autoComplete='password' required={true} placeholder='Confirm Password' onChange={handleConfirmPasswordChange}/>
  
            <div className="flex items-center justify-between">
                <button type="button" className="my-auto bg-gray-200 px-3 py-1.5 rounded-xl font-semibold">
                    <ChakraLink as={ReactRouterLink} to='/'>Cancel</ChakraLink>
                </button>
                <button
                    type="submit"
                    className="my-auto px-3 py-1.5 rounded-xl font-semibold text-white bg-green-600 hover:bg-green-700"
                    onClick={handleSubmit}>
                    Register
                </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SignUp;