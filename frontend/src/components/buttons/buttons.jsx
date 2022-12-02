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
            <button
                className={BUTTON_TYPES[type] || BUTTON_TYPES.RED}
                onClick={onClick}
            >
                {text}
            </button>
        </div>
    );
}
