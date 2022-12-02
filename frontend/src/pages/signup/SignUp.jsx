import React, { useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../signup/SignUp.css";
import Tag from "../../components/tagShape/Tag";
import { AppContext, useApp } from "../../App";
import Navbar from '../../components/navbar/navbar';
import {v4 as uuidv4} from "uuid"

//maybe add is loading feature
//add navbar component later
export default function SignUp() {
  const {apiPost, logIn} = useApp();

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
    //console.log("password match is", passwordMatch);
    //console.log("enableSubmit is ", enableSubmit);
  }, [passwordConfirm, password]);

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
        //console.log('password match is', passwordMatch);
        //console.log('enableSubmit is ', enableSubmit);
    }, [passwordConfirm, password]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      userId: uuidv4(),
      username,
      password,
      email,
      major: "",
      graduationYear: 0,
      posts: []
    };
    const { status, ...data } = await apiPost("/account/create", body);
    if (status===200) {
      if (await logIn(username,password)) {
        navigate("/");
      }
    }
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
        <form onSubmit={handleSubmit}>
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
            <p className="incorrectEntry"> Please use USC email</p>
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
                      <Button
                          variant="contained"
                          type="submit"
                          onClick={handleSubmit}
                          style={{ backgroundColor: '#6A1F1F' }}
                          disabled={!enableSubmit}
                      >
                          {' '}
                          Sign Up{' '}
                      </Button>
                </form>
                <h3 className="SUtext">
                    {' '}
                    *must be a USC-associated email address (@usc.edu){' '}
                </h3>
            </div>
        </>
    );
}
