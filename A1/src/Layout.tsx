import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from './components/NavBar';

const Layout = ({ children, showFooter = true }: { children: React.ReactNode, showFooter?: boolean }) => {
    return (
        <>
            <div className="min-h-[calc(100vh-280px)]">
            <Header />
            <NavBar />
                
            {/* Main content */}
            <main className=''>{children}</main>
            </div>

            {/* Toggle show footer option optionally - Excluded in SignIn, SignUp and Payment page*/}
            {showFooter && <Footer />}
        </>
    );
};

export default Layout;
