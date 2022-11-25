import React from 'react';
import './buttons.css';

export const BUTTONTYPE = {
    WHITE: 'WHITE',
    RED: 'RED',
}

export default function Button(props) {

    const { type, text } = props;

    const buttonType = () => {
        switch(type){
            case BUTTONTYPE.WHITE:
                return 'whiteButton';
            case BUTTONTYPE.RED:
                return 'redButton';
            default:
                return 'button'; /*not applicable but required*/
        }
    }

    return(
        <div className="buttoncontainer">
            <div className={`${buttonType()}`}>{ text }</div>
        </div>
    );
}
