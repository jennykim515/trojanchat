import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";

export default function LogIn() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e) => {
    }
    return(
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
            <label> Username: 
                <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        marginBottom="10px"/>
            </label>
            <br/>
            <br/>
            <label> Password: 
                <input 
                        type="text" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        marginBottom="10px"/>
            </label>
            </form>
        </>

    );
}
