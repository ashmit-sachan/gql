import { useState } from 'react';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import InputText from './InputText';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';


function Footer() {
    const currentYear = new Date().getFullYear();

    // State to hold the email value
    const [subscription, setSubscription] = useState('');

    const handleSubscriptionChange = (newSubscription: string) => {
        setSubscription(newSubscription);
    }

    // Add other form handling logic as necessary
    const handleSubscription = (event: any) => {
        event.preventDefault();
        console.log(subscription);
        // Additional submit logic here
    }

    return (
        <footer className="pt-12 pb-4 px-6 text-sm w-screen bg-slate-200">
            <section className="max-w-screen-md lg:max-w-screen-lg mx-auto">
                <div className="flex mb-6 justify-between">
                    <div className="flex-1">
                        <p className="text-3xl font-semibold text-zinc-900">SOIL</p>
                        <p className="text-sm font-normal text-zinc-900">Discover fresh organic produce with SOIL's new website</p>
                    </div>

                    <div className="relative flex-1">
                        <p className="text-sm ml-1 font-semibold text-zinc-900">Subscribe to our newsletter</p>
                        <div className="flex justify-start w-full space-x-2 relative max-w-96">
                            <InputText name='subscription' label={false} type='Email' required={false} placeholder='Email' onChange={handleSubscriptionChange} />
                            <button
                                type="button"
                                className="p-2 rounded-lg font-semibold text-white bg-green-600 absolute right-0 translate-y-1 hover:scale-105"
                                onClick={handleSubscription}>
                                <KeyboardArrowRightIcon fontSize='small' />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full items-center flex-wrap">
                    <div className="flex flex-row justify-around w-full my-2 flex-wrap">
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">About</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Sustainability</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Press</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Careers</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Developers</ChakraLink>
                    </div>

                    <div className="flex flex-row justify-around w-full my-2 flex-wrap">
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Gift Cards</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Affiliates</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Partnerships</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">Brands</ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center">SOIL for Business</ChakraLink>
                    </div>
                    <div className="flex flex-row w-min my-3 justify-center">
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center mx-2">
                            <InstagramIcon fontSize='small' />
                        </ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center mx-2">
                            <FacebookRoundedIcon fontSize='small' />
                        </ChakraLink>
                        <ChakraLink as={ReactRouterLink} to='#' className="text-gray-400 flex-1 text-center mx-2">
                            <XIcon fontSize='small' />
                        </ChakraLink>
                    </div>
                </div>
            </section>
            <p className="text-center mt-2 text-gray-300">©{currentYear} SOIL</p>
        </footer>
    );
}

export default Footer;


