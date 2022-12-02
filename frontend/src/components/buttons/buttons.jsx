import React from 'react';
import './buttons.css';
import { useNavigate } from 'react-router-dom';

const BUTTON_TYPES = {
    WHITE: 'whiteButton',
    RED: 'redButton',
};

export default function Button(props) {
    const {
        type,
        children,
        text = children,
        action,
        location,
        onClick,
    } = props;
    const navigate = useNavigate();

    return (
        <div className="buttoncontainer">
            <div className={BUTTON_TYPES[type] || 'button'} onClick={onClick}>
                {text}
            </div>
        </div>
    );
}
