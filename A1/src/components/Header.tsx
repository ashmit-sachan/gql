import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';


function Header() {
    return (
        <>
            <header className="h-14 w-full relative border-b border-gray-200">
                <section className="w-11/12 h-full flex content-center mx-auto">
                    <div className="logo my-auto flex-none mr-4">
                        <ChakraLink as={ReactRouterLink} to='/'>
                            <h1 className="text-xl">* SOIL</h1>
                        </ChakraLink>
                    </div>

                    <nav className="my-auto flex-grow">
                        <ul className="flex justify-end content-center">
                            <li className=" my-auto px-3 py-1.5 bg-gray-200 rounded-xl font-medium text-sm hover:scale-105">
                                <ChakraLink as={ReactRouterLink} to='/signin'>Sign In</ChakraLink>
                            </li>
                            <li className="mx-2 my-auto bg-green-600 px-3 py-1.5 rounded-xl font-medium text-sm hover:scale-105">
                                <ChakraLink as={ReactRouterLink} to='/signup' className='text-white'>Sign Up</ChakraLink>
                            </li>

                            <div className="bg-gray-200 px-2 pb-2 pt-1 rounded-xl ml-1 hover:scale-105">
                                <ChakraLink as={ReactRouterLink} to='/cart'><ShoppingBagOutlinedIcon fontSize='small' /></ChakraLink>
                            </div>
                        </ul>

                    </nav>
                </section>
            </header>
        </>
    );
}

export default Header;