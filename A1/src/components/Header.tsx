import { Link as ReactRouterLink } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import XIcon from '@mui/icons-material/X';


function Header() {
    return (
        <>
            <header className="h-content w-full relative bg-gray-200">
                <section className="w-11/12 h-full flex justify-between items-center content-center mx-auto">
                    <span className="text-sm font-medium">New OFFERS every week!!</span>
                    
                    <div className="flex flex-row w-min justify-center py-1">
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
                </section>
            </header>
        </>
    );
}

export default Header;