import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../login/LogIn.css"
import { useApp } from '../../App';
import Bubbles from '../../components/logo/chatbubble';

export default function LogIn() {
    const { logIn } = useApp();

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (await logIn(username, password)) {
            window.location = "/";
        }
        else {
            alert("Invalid username/password");
        }
    }
    return(
        <>
        <div id="welcomeDropDown"> 
                <div id="logoCircle"><div id="image"><Bubbles /></div></div>
                <p id="trojanChats"> Trojan Chats </p> 
        </div>
        <div id="curvedInfoBox"> <p id="infoInCurvedBox">An online forum platform designed for USC students, by USC students. Trojan Chats is a hub for USC-related questions, discussions, and networking opportunities. Free for all USC Trojans. </p> </div>
        <div id="LogIn">
            <form id="logInForm" onSubmit={handleSubmit}>
            <Box
            component="form"
            sx={{
                // borderRadius: '50%',
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
            >
                <TextField id="outlined-basic" name="username" label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} required /> 
            </Box>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic"  type={"password"} name="password" label="Password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} required /> 
            </Box>
            <span id="span2"> 
                <Button variant="contained" type="submit" onClick={() => handleSubmit()}
                sx={{width: '100%',
                    height: '50px',
                    color: 'white',
                    backgroundColor: '#6A1F1F',
                    fontSize: '15px',
                    fontFamily: 'Helvetica',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    transitionDuration: '0.4s',
                    "&:hover": {
                        backgroundColor: '#FFD25F'
                    }}} 
                > Login </Button>
                <p id="or"> or </p>
                <Button variant="contained" type="submit" onClick={() => handleSubmit()}
                    sx={{width: '100%',
                    height: '50px',
                    color: 'white',
                    backgroundColor: '#6A1F1F',
                    fontSize: '15px',
                    fontFamily: 'Helvetica',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    transitionDuration: '0.4s',
                        "&:hover": {
                            backgroundColor: '#FFD25F'
                        }}}
                > Create an Account </Button>
            </span>
            </form>
        </div>
        </>

    );
}