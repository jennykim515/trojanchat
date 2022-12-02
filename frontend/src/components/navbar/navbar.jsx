import React from 'react';
import './navbar.css';
import Logo from '../logo/logo';
import { useApp } from '../../App';
import Button from '../buttons/buttons';
import { useNavigate } from 'react-router-dom';
/*import Menu from '../menu/menu'; will add this unless stated otherwise*/

/*note: a tags will probably be replaced by routers or edited */

const Navbar = ({ navType }) => {
    const { logOut, loggedIn } = useApp();
    let navigate = useNavigate();

    const navigateOneLevelUp = () => {
        const path = window.location.pathname;
        const pathArray = path.split('/');
        pathArray.pop();
        const newPath = pathArray.join('/');
        navigate(newPath);
    };

    let navButton = null;
    switch (navType) {
        case 1:
            navButton = (
                <li
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <Button type="WHITE" text="Return to Homepage" />
                </li>
            );
            break;
        case 2:
            navButton = (
                <li
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    <Button type="WHITE" text="Return to Navigation" />
                </li>
            );
            break;
        case 3:
            navButton = (
                <li
                    onClick={() => {
                        navigateOneLevelUp();
                    }}
                >
                    <Button type="WHITE" text="Return to Board" />
                </li>
            );
            break;
        default:
            break;
    }

    return (
        <div className="navbarcontainer">
            <div className="navbarleft">
                <Logo />
            </div>
            <nav>
                <ul>
                    {navButton}
                    {loggedIn && (
                        <>
                            <li>
                                <button onClick={logOut}>Logout</button>
                            </li>
                            <li>
                                <a href="/profile">Profile</a>
                            </li>
                        </>
                    )}
                    {!loggedIn && (
                        <>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                            <li>
                                <a href="/signup">Signup</a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
};

const NavbarNoLinks = () => {
    return (
        <div className="navbarcontainer">
            <div className="navbarleft">
                <Logo />
            </div>
            <nav></nav>
        </div>
    );
};

export default Navbar;
export { NavbarNoLinks };
