import React from 'react';
import { useNavigate, Link} from 'react-router-dom';
import { useEffect } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function SignUp() {
    const [email, setEmail] = React.useState(''); 
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');


    const handleSubmit = (e) => {
        if(password != passwordConfirm){
            return(<p> passwords don't match :( </p>)
        }
    }
    return(
        <>
        <form onSubmit={(e) => handleSubmit(e)}>

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField id="outlined-basic" label="Email" variant="outlined" required />
        </Box>

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField id="outlined-basic" label="Username" variant="outlined" required />
        </Box>

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField id="outlined-basic" label="Password" variant="outlined" required />
        </Box>

        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" required />
        </Box>
        <Button variant="contained">Contained</Button>
            <button type="Submit"> Sign Up</button>
            </form>
        </>

    );
}