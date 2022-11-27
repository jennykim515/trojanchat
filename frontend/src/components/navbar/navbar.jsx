import React from 'react';
import './navbar.css'
import Logo from '../logo/logo';
import { useApp } from '../../App';
/*import Menu from '../menu/menu'; will add this unless stated otherwise*/

/*note: a tags will probably be replaced by routers or edited */

const Navbar = () => {
    const {logOut} = useApp();

    return(
    <div className="navbarcontainer">
        <div className="navbarleft"><Logo /></div>
            <nav>
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li><button onClick={logOut}>Logout</button></li>
                </ul>
            </nav>
    </div>
    )
}

const NavbarNoLinks = () => {
    return(
    <div className="navbarcontainer">
        <div className="navbarleft"><Logo /></div>
            <nav>
            </nav>
    </div>
    )
}

export default Navbar; 
export{ 
    NavbarNoLinks
}