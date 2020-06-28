import { FunctionComponent } from 'react';
import { Flex } from '@chakra-ui/core';
import { NavBar } from './nav-bar/NavBar';
import { Footer } from './Footer';

export const Layout: FunctionComponent = ({children}) => {
    return(<Flex direction={"column"}>
        <NavBar />
        {children}
        <Footer/>
        </Flex>);
}