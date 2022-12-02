import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { AppContext } from '../../App'
import Navbar from '../../components/navbar/navbar';
import {Link} from 'react-router-dom';
import { useApp } from '../../App';
import "../user/OtherUser.css"

export default function UserProfile({ props }) {

  const { apiPost, user, token, userId } = useApp();

  const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
  const [emailValue, setEmail] = useState(user.email);
  const [majorValue, setMajor] = useState(user.major);
  const [gradValue, setGrad] = useState(user.graduationYear);
  const [usernameValue, setUsername] = useState(user.username);

  const TOKEN_KEY = "chatToken";
  const USER_ID = "userID";

  useEffect(()=>{
    console.log(user, token, userId);

    //user.id
    fetch('https://trojanchat.wl.r.appspot.com/api/account/view?id=' + user.id)
    .then(response=> response.json())
    .then(data =>{
 
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
  const [navType, setNavType] = useState(2);
  return (
    <div>
      <Navbar navType={navType} setNavType={setNavType} />
      <h1 id = "title">{usernameValue} Profile</h1>
     <table>
         <tr>
             <td>Username: </td>        
             <td>{usernameValue}</td>
         </tr>
         <tr>
             <td> Major:</td>
             <td>{majorValue}</td>    
         </tr>
         <tr>  
             <td>Graduation Year:</td> 
             <td>{gradValue}</td>    
         </tr>
     </table>
    <Link to="/profile/mythreads">
    <button className="btn3">{usernameValue}'s Threads</button>
    </Link>
    <Link to="/somelink">
    <button className="btn4">{usernameValue}'s Comments</button>
    </Link>
    <Link to="/somelink">
    <button className="btn5">Return to Navigation</button>
    </Link>
      <br/>
      <br/><br/><br/><br/><br/>
    </div>
  )
}

