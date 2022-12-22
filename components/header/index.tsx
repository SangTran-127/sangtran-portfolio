import React from 'react'
import HeaderMobile from './HeaderMobile'
import HeaderDesktop from './HeaderDesktop'

const Header = () => {
    return (
        <header className="bg-dracula-darker">
            <HeaderMobile />
            {/* <HeaderDesktop /> */}
        </header>
    )
}

export default Header