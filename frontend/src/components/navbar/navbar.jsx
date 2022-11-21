import React from 'react';
import './navbar.css'
import Logo from '../logo/logo';
/*import Menu from '../menu/menu'; will add this unless stated otherwise*/

/*note: a tags will probably be replaced by routers or edited */

const Navbar = () => {
    return(
    <div className="navbarcontainer">
        <div className="navbarleft"><Logo /></div>
            <nav>
                <ul>
                    <li><a href="/profile">Profile</a></li>
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </nav>
    </div>
    )
}

export default Navbar;