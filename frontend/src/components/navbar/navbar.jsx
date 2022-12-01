import React from 'react';
import './navbar.css'
import Logo from '../logo/logo';
import { useApp } from '../../App';
import Button from '../buttons/buttons';
import { useNavigate } from 'react-router-dom';
/*import Menu from '../menu/menu'; will add this unless stated otherwise*/

/*note: a tags will probably be replaced by routers or edited */

const Navbar = ({navType, setNavType}) => {
    const {logOut} = useApp();
    let navigate = useNavigate(); 
    const {} = useApp();

    const logOut2 = () => {
        logOut();
        navigate("/login");
      };

    // default
    if(navType === 0) {
        return (
            <div className="navbarcontainer">
            <div className="navbarleft"><Logo /></div>
                <nav>
                    <ul>
                        <li><a href="/profile">Profile</a></li>
                        <li><button onClick={logOut2}>Logout</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
    // registration page (back to homepage)
    else if(navType === 1) {
        return (
            <div className="navbarcontainer">
            <div className="navbarleft"><Logo /></div>
                <nav>
                    <ul>
                        <li onClick={() => {
                            setNavType(0)
                            navigate('/')
                        }}><Button type="WHITE" text="Return to Homepage" /></li>
                        <li><a href="/profile">Profile</a></li>
                        <li><button onClick={logOut2}>Logout</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
    // Profile page
    else if(navType === 2) {
        return (
            <div className="navbarcontainer">
            <div className="navbarleft"><Logo /></div>
                <nav>
                    <ul>
                        <li onClick={() => {
                            setNavType(0)
                            navigate(-1)
                        }}><Button type="WHITE" text="Return to Navigation" /></li>
                        <li id="profileB1"><a href="/profile">Profile</a></li>
                        <li id="logoutB1"><button onClick={logOut2}>Logout</button></li>
                    </ul>
                </nav>
            </div>
        )
    }
    // Comments page
    else if(navType === 3) {
        return (
            <div className="navbarcontainer">
            <div className="navbarleft"><Logo /></div>
                <nav>
                    <ul>
                        <li onClick={() => {
                            setNavType(0)
                            navigate(-1)
                        }}><Button type="WHITE" text="Return to Board"/></li>
                        <li id="profileB1"><a href="/profile">Profile</a></li>
                        <li id="logoutB1"><button onClick={logOut2}>Logout</button></li>
                    </ul>
                </nav>
            </div>
        )
    }

    else if(navType === 4){
        return (
            <div className="navbarcontainer">
            <div className="navbarleft"><Logo /></div>
                <nav>
                    <ul>
                        <li><a href="/login">Login</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
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