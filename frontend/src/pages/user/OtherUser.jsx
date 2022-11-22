import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { AppContext } from '../../App'

const data = {
    employeeId:'01',
    username: 'John Doe',
    email: 'johndoe@email.com',
    major: 'Frontend Developer',
    graduation: 'something'
  }

export default function OtherUser({props}) {

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

  const { user } = useContext(AppContext)


  return (
    <Container>
      <h1>{user.name}'s Profile</h1>
      <d1>Double click on text to edit major or graduation year. </d1>
     <table>
         <tr>
             <td>Username: </td>
             <td>{usernameValue}</td>
         </tr>
         <tr>
             <td>Email: </td>
             <td>
                 {emailValue}
             </td>
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

      <br/>
      <br/><br/><br/><br/><br/>
    </Container>
  )
}

