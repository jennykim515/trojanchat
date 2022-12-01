import React from 'react';
import './buttons.css';
import { useNavigate } from 'react-router-dom';

export default function Button(props) {

    const { type, text, action, location} = props;
    const navigate = useNavigate();
    
    const BUTTONTYPE = {
        WHITE: 'WHITE',
        RED: 'RED',
    }

    const buttonType = () => {
        switch(type){
            case BUTTONTYPE.WHITE:
                return 'whiteButton';
            case BUTTONTYPE.RED:
                return 'redButton';
            default:
                return 'button';
        }
    }

    function handleClick(e) {
        switch (action) {
            case "navigate":
                return(navigate(location));
            case "submit":
                return(e.preventDefault());
        }
    }

    return(
        <div className="buttoncontainer">
            <div className={`${buttonType()}`} onClick={() => handleClick()} >{ text }</div>
        </div>
    );
}