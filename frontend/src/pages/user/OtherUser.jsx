
import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { AppContext } from '../../App'
import Navbar from '../../components/navbar/navbar';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import { useApp } from '../../App';
import "../user/OtherUser.css"

export default function UserProfile({ props }) {

  const { apiPost, user, token, userId } = useApp();

  const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
  const [emailValue, setEmail] = useState(user.email);
  const [majorValue, setMajor] = useState(user.major);
  const [gradValue, setGrad] = useState(user.graduationYear);
  const [usernameValue, setUsername] = useState(user.username);

  const navigate = useNavigate();

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
    <div className="wholecontainer">
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
    <div className="redbuttoncontainer">
      <div className="span2">
        <Button variant="contained" onClick={() => {navigate('/profile/mythreads')}}
                sx={{
                  width: '100%',
                  height: '50px',
                  color: 'white',
                  backgroundColor: '#6A1F1F',
                  fontSize: '16px',
                  fontFamily: 'Helvetica',
                  marginRight: '60px',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  transitionDuration: '0.4s',
                  '&:hover': {
                      backgroundColor: '#FFD25F',
                  },
              }}
        >{usernameValue}'s Threads</Button>
        <Button variant="contained" onClick={() => {navigate('/somelink')}}
                sx={{
                  width: '100%',
                  height: '50px',
                  color: 'white',
                  backgroundColor: '#6A1F1F',
                  fontSize: '16px',
                  fontFamily: 'Helvetica',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  transitionDuration: '0.4s',
                  '&:hover': {
                      backgroundColor: '#FFD25F',
                  },
              }}
        >{usernameValue}'s Comments</Button>
      </div>

    <Button variant="outlined" onClick={() => {navigate('/somelink')}}
                sx={{
                  width: '100%',
                  height: '50px',
                  margin: '18px 0px 0px 0px',
                  color: '#6A1F1F',
                  backgroundColor: '#white',
                  borderColor: '#6A1F1F',
                  fontSize: '16px',
                  fontFamily: 'Helvetica',
                  borderRadius: '40px',
                  cursor: 'pointer',
                  transitionDuration: '0.4s',
                  '&:hover': {
                      backgroundColor: '#FFD25F',
                  },
              }}
        >Return to Navigation</Button>
      </div>
      <br/>
      <br/><br/><br/><br/><br/>
    </div>
  )
}
