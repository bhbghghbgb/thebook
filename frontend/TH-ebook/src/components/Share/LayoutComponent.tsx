import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.tsx';

interface Props {
    children: React.ReactNode;
    isMobile: boolean;
}

const Layout = ({children, isMobile}: Props) => {
    const location = useLocation();
    const hideNavbar = location.pathname.includes('/auth/signup') || location.pathname.includes('/auth/signin');

    return (
        <>
            {!hideNavbar && (
                <div className="h-[var(--navbar-height)]">
                    <NavBar isMobile={isMobile}/>
                </div>
            )}
            {children}
        </>
    );
}

export default Layout;
