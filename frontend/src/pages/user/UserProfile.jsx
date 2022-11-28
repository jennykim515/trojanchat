import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import "../user/UserProfile.css"

const data = {
    employeeId:'01',
    username: 'John Doe',
    email: 'johndoe@email.com',
    major: 'Frontend Developer',
    graduation: 'something'
  }

export default function UserProfile({props}) {



  const [employeeData, setEmployeeData] = useState(data)

    const [emailInput, setEmailInput] = useState(true) //thi shide/show inputfield
    const [emailValue, setEmail] = useState(data.email)
    const [majorValue, setMajor] = useState('')
    const [gradValue, setGrad] = useState('')
    const [usernameValue, setUsername] = useState(data.username)


/*    useEffect(()=> {
         //tis will run when your page loads  
         fetch('url')
         .then( response => response.json())
         .then(data => {
          console.log('my data', data);
         
            setUsername(data.username)
            setEmail(data.email)
            setMajor(data.major)
            setGrad(data.graduation)            
         })

    },[])

    */

    function formHandler(e){
      e.preventDefault();
      console.log("I am sending", usernameValue, emailValue, majorValue, gradValue)

            //replace url with right one
      fetch('url', {
        Method: 'POST',
        Headers: {
        Accept: 'application.json',
        'Content-Type': 'application/json'
        },
        Body: {
        username: usernameValue,
        email: emailValue,
        major: majorValue,
        graduation: gradValue
        },
      })

    }
    function toggleEmail() {
        setEmailInput(!emailInput)

    }

    console.log('data',data)

  return (
    <Container>
      <h1 className="title">User Profile</h1>
      <d1>Double click on text to edit major or graduation year. </d1>
      <div id = "Info">
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
    </Container>
  )
}

