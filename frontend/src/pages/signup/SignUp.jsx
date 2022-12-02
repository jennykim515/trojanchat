import React, { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../signup/SignUp.css";
import Tag from "../../components/tagShape/Tag";
import { AppContext } from "../../App";
import Navbar from '../../components/navbar/navbar';

//maybe add is loading feature
//add navbar component later
export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [passwordMatch, setPasswordMatch] = React.useState(true);
  const [enableSubmit, setEnableSubmit] = React.useState(false);
  const [incorrectEmail, setIncorrectEmail] = React.useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (
      !email.toLowerCase().endsWith("@usc.edu") &&
      email.length != 0 &&
      email.includes("@")
    ) {
      setIncorrectEmail(true);
    } else {
      setIncorrectEmail(false);
    }
  }, [email]);

    useEffect(() => {
        if (password.length === 0 || passwordConfirm.length === 0) {
            setPasswordMatch(true);
            setEnableSubmit(false);
        } else if (password !== passwordConfirm) {
            setPasswordMatch(false);
            setEnableSubmit(false);
        } else {
            setPasswordMatch(true);
            setEnableSubmit(true);
        }
        console.log('password match is', passwordMatch);
        console.log('enableSubmit is ', enableSubmit);
    }, [passwordConfirm, password]);

  const handleSubmit = (e) => {
    navigate("/")
  };

  const [navType, setNavType] = useState(4);
  return (
    <>
    <Navbar navType={navType} setNavType={setNavType} />
      <div id="SignUp">
        <h3 id="register" className="SUtext">
          {" "}
          Register for an Account{" "}
        </h3>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-basic"
              name="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Box>
          {incorrectEmail ? (
            <p className="incorrectEntry"> please use USC email</p>
          ) : null}

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            name="password_repeat"
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Box>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            type={'password'}
                            name="password_repeat"
                            label="Password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Box>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="outlined-basic"
                            type={'password'}
                            name="password_repeat"
                            label="Confirm Password"
                            variant="outlined"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                    </Box>
                    {passwordMatch ? null : (
                        <p className="incorrectEntry">
                            {' '}
                            *passwords do not match
                        </p>
                    )}
                    {enableSubmit ? (
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => handleSubmit()}
                            style={{ backgroundColor: '#6A1F1F' }}
                        >
                            {' '}
                            Sign Up{' '}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => handleSubmit()}
                            style={{ backgroundColor: '#6A1F1F' }}
                            disabled
                        >
                            {' '}
                            Sign Up{' '}
                        </Button>
                    )}
                </form>
                <h3 className="SUtext">
                    {' '}
                    *must be a USC-associated email address (@usc.edu){' '}
                </h3>
            </div>
        </>
    );
}
