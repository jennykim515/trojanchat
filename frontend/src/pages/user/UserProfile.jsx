import { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import '../user/UserProfile.css';
import Navbar from '../../components/navbar/navbar';
import { useApp } from '../../App';
import { AppContext } from '../../App';

export default function UserProfile({ props }) {
    const { apiPost, apiPut, user, token, userId } = useApp();
    // const { setNavType } = useContext(AppContext)
    const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
    const [emailValue, setEmail] = useState(user.email);
    const [majorValue, setMajor] = useState(user.major);
    const [gradValue, setGrad] = useState(user.graduationYear);
    const [usernameValue, setUsername] = useState(user.username);

    useEffect(() => {
        setEmail(user.email);
        setMajor(user.major);
        setGrad(user.graduationYear);
        setUsername(user.username);
    }, [user]);

    const formHandler = async (e) => {
        e.preventDefault();

        const { status } = await apiPut('/account/update', {
            ...user,
            email: emailValue,
            major: majorValue,
            graduationYear: gradValue,
            username: usernameValue,
        });

        if (status === 200) {
            console.log('success');
        } else {
            console.log('fail');
        }
    };
    function toggleEmail() {
        setEmailInput(!emailInput);
    }
    const [navType, setNavType] = useState(2);
    return (
        <div>
            <Navbar navType={navType} setNavType={setNavType} />
            <div id="Writing">
                <h1 className="title">User Profile</h1>
                <br />
                <h2 className="header">
                    Double click on text to edit major or graduation year.
                </h2>
                <br />
                <br />
                <form onSubmit={formHandler}>
                    <fieldset>
                        <label>Username: </label>
                        <span>{usernameValue}</span>
                    </fieldset>
                    <fieldset>
                        <label>Email: </label>
                        <span>{emailValue}</span>
                    </fieldset>
                    <fieldset>
                        <label>Major: </label>
                        <input
                            type="text"
                            value={majorValue}
                            onChange={(e) => setMajor(e.target.value)}
                            marginBottom="10px"
                        />
                    </fieldset>
                    <fieldset>
                        <label>Graduation Year: </label>
                        <input
                            type="text"
                            value={gradValue}
                            onChange={(e) => setGrad(e.target.value)}
                            marginBottom="10px"
                        />
                    </fieldset>
                    <br />
                    <br />
                    <fieldset className="center">
                        <button className="btn" type="submit">
                            Save Changes
                        </button>
                    </fieldset>
                </form>
                <br />
                <br />
                <br />
            </div>
        </div>
    );
}
