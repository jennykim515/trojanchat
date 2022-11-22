import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

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
      <form onSubmit={formHandler}>
     <table>
         <tr>
             <td>Username: </td>
             <td>{data.username}</td>
         </tr>
         <tr>
             <td>Email: </td>
             <td>
                 {emailInput ? <span onClick={toggleEmail}>{data.email}</span> :  <input type="text"/> }
             </td>
         </tr>
         <tr>
             <td>
                Major:
             </td>
             <td>
                <input 
                        type="text" 
                        value={majorValue} 
                        onChange={(e) => setMajor(e.target.value)} 
                        marginBottom="10px"/>
             </td>
         </tr>
         
         <tr>
             <td>
                Graduation Year:
             </td>
             <td>
             <input 
                        type="text" 
                        value={gradValue} 
                        onChange={(e) => setGrad(e.target.value)} 
                        marginBottom="10px"/>
             </td>
         </tr>
         <Button type="submit">Save Changes</Button>
     </table>
     </form>

      <br/>
      <br/><br/><br/><br/><br/>
    </Container>
  )
}

