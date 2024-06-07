import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import api from '../api';

import InputText from '../components/InputText';

function SignUp() {
    // State to hold the name value
    const [name, setName] = useState('');

    const handleNameChange = (newName: string) => {
        setName(newName);
    };
    
    // State to hold the email value
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    
    // State to hold the password value
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    };

    const validatePassword = (password: string) => {
        // Password requirements:
        // - At least 8 characters long
        // - Contains at least one uppercase letter
        // - Contains at least one lowercase letter
        // - Contains at least one digit
        // - Contains at least one special character
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+-])[A-Za-z\d@$!%*?&#+-]{8,}$/;
        return regex.test(password);
    };
    
    // State to hold the confirm password value
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleConfirmPasswordChange = (newConfirmPassword: string) => {
        setConfirmPassword(newConfirmPassword);
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        return password === confirmPassword;
    };

    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();

        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);
        const confirmPasswordValid = validateConfirmPassword(password, confirmPassword);

        // Email validation
        if (!emailValid) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }

        // Password validation
        if (!passwordValid) {
            setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
        } else {
            setPasswordError('');
        }

        // Confirm password validation
        if (!confirmPasswordValid) {
            setConfirmPasswordError('Passwords do not match');
        } else {
            setConfirmPasswordError('');
        }

        if (emailValid && passwordValid && confirmPasswordValid) {
            api.post('/users/sign-up', { name, email, password })
                .then((response: any) => {
                    console.log(response.data);
                })
                .catch((error: any) => {
                    console.error(error);
                });
        }
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="w-full">
            <h2 className="text-center text-3xl font-semibold text-zinc-900">Create an Account</h2>
            <p className="mt-2 text-center text-sm text-zinc-600">
              Join SOIL to get the best organic produce
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <InputText name='Name' type='text' required={true} placeholder='Name' onChange={handleNameChange}/>
            <InputText name='Email' type='email' autoComplete='email' required={true} placeholder='Email' error={emailError} onChange={handleEmailChange}/>
            <InputText name='Password' type='password' autoComplete='password' required={true} placeholder='Password' error={passwordError} onChange={handlePasswordChange}/>
            <InputText name='Confirm Password' type='password' autoComplete='password' required={true} placeholder='Confirm Password' error={confirmPasswordError} onChange={handleConfirmPasswordChange}/>
  
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
