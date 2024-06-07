import { useState } from 'react';
import Cookies from 'js-cookie';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { toast } from 'react-toastify'
import api from '../api';


import InputText from '../components/InputText';

function SignIn() {
    // State to hold the email value
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleEmailChange = (newEmail: string) => {
        setEmail(newEmail);
    }

    const validateEmail = (email: string) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };
    
    // State to hold the password value
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handlePasswordChange = (newPassword: string) => {
        setPassword(newPassword);
    }

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
    
    // Add other form handling logic as necessary
    const handleSubmit = (event: any) => {
        event.preventDefault();
        // console.log("Email: ", email);
        // console.log("Password: ", password);

        var emailValid:Boolean = validateEmail(email);
        var passwordValid:Boolean = validatePassword(password);

        // Additional submit logic here
        if (!emailValid) {
          setEmailError('Invalid email address');
        } else {
          setEmailError('');
        }

        if (!passwordValid) {
          setPasswordError(`Invalid Password`);
        } else {
          setPasswordError('');
        }

        if (emailValid && passwordValid) {
          api.post('/users/sign-in', { email: email, password: password })
            .then((response: any) => {
              console.log(response.data);
              // Set the cookie with the user's ID
              Cookies.set('user', response.data.id);
              toast("Sign in successful", { type: 'success' });
              api.post('/users/user', { email: response.data.id })
              .then((response: any) => {
                Cookies.set('user_name', response.data.name);
                window.location.href = '/profile';
              })
              .catch((error: any) => {
                console.error(error);
              });

            })
            .catch((error: any) => {
              console.error(error);
              toast("Sign in failed", { type: 'error' });
            });
        }
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
          <form className="mt-8 space-y-6">
            <InputText name='Email' type='email' autoComplete='email' required={true} placeholder='Email' error={emailError} onChange={handleEmailChange}/>
            <InputText name='Password' type='password' autoComplete='password' required={true} placeholder='Password' error={passwordError} onChange={handlePasswordChange}/>
  
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
