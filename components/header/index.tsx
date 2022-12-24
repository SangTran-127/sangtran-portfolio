import React from 'react'
import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'

const Header = () => {
    return (
        <header className="bg-dracula-darker-900 h-20" >
            <HeaderMobile />
            <HeaderDesktop />
        </header>
    )
}

export default Header