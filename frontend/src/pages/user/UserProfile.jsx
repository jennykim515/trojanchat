
import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import "../user/UserProfile.css"
import { useApp } from '../../App';

const data = {
    employeeId: '01',
    username: 'John Doe',
    email: 'johndoe@email.com',
    major: 'Frontend Developer',
    graduation: 'something',
};

export default function UserProfile({ props }) {
    const { apiPost, user } = useApp();

    const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
    const [emailValue, setEmail] = useState(user.email);
    const [majorValue, setMajor] = useState(user.major);
    const [gradValue, setGrad] = useState(user.grad);
    const [usernameValue, setUsername] = useState(user.username);

    const formHandler = async (e) => {
        e.preventDefault();

        const { status } = await apiPost('/account/update', {
            email: emailValue,
            major: majorValue,
            graduation: gradValue,
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


    console.log('data',data)

  return (
    <Container>
      <div id = "Info">
      <div id = "Writing">
      <h1 className="title">User Profile</h1>
      <d1>Double click on text to edit major or graduation year. </d1>
      <form onSubmit={formHandler}>
        <fieldset>
          <label >Username: </label>
          <span>{data.username}</span>
        </fieldset>
        <fieldset>
          <label >Email: </label>
          {emailInput ? <span onClick={toggleEmail}>{data.email}</span> :  <input type="text"/> }
        </fieldset>
        <fieldset>
          <label >Major: </label>
          <input 
                        type="text" 
                        value={majorValue} 
                        onChange={(e) => setMajor(e.target.value)} 
                        marginBottom="10px"/>
        </fieldset>
        <fieldset>
          <label >Graduation Year: </label>
          <input 
                        type="text" 
                        value={gradValue} 
                        onChange={(e) => setGrad(e.target.value)} 
                        marginBottom="10px"/>
        </fieldset>
        <fieldset className="center">
        <button className="btn" type="submit">Save Changes</button>
        </fieldset>
     </form>
      <br/>
      <br/><br/><br/><br/><br/>
      </div>
      </div>
    </Container>
  )
  }