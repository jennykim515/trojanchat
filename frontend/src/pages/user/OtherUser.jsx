import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { AppContext } from '../../App'
import {Link} from 'react-router-dom';
import { useApp } from '../../App';


export default function UserProfile({ props }) {

  const { apiPost, user } = useApp();

  const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
  const [emailValue, setEmail] = useState(user.email);
  const [majorValue, setMajor] = useState(user.major);
  const [gradValue, setGrad] = useState(user.graduationYear);
  const [usernameValue, setUsername] = useState(user.username);


 useEffect(()=>{

  fetch('https://trojanchat.wl.r.appspot.com/api/account/view?id=someUUID')
  .then(response=> response.json())
  .then(data =>{

     setEmail(data.email);
     setMajor(data.major);
     setGrad(data.graduationYear)
     setUsername(data.username)
    console.log(data)
  })

 },[])
 
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

  return (
    <Container>
      <h1>{usernameValue}'s Profile</h1>
     <table>
         <tr>
             <td>Username: </td>
             <td>{usernameValue}</td>
         </tr>
         <tr>
             <td>
                Major:
             </td>
             <td>
                {majorValue}
             </td>
         </tr>
         <tr>
             <td>
                Graduation Year:
             </td>
             <td>
              {gradValue}
             </td>
         </tr>
     </table>
    <Link to="/somelink">
    User's Threads
    </Link>
    <Link to="/somelink">
    User's Comments
    </Link>
    <Link to="/">
    Return to Navigation
    </Link>
      <br/>
      <br/><br/><br/><br/><br/>
    </Container>
  )
}

