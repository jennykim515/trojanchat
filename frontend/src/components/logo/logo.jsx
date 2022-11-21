import React from 'react';
import { ReactComponent as Icon } from "../../assets/logo.svg";
import './logo.css';

export default function Logo(props){
    return <div className="logowrapper">
        <div className="logoimage"><a href="/"><Icon width="250%" /></a></div>
    </div>
}