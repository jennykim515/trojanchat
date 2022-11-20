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

export default function UserProfile() {

    // fetch('http://example.com/movies.json')
    //     .then((response) => response.json())
    //     .then((data) => {
    //
    //         //data is here
    //         //const [data, setData] = useState(data)
    //
    //     });

  const [employeeData, setEmployeeData] = useState(data)

    const [emailInput, setEmailInput] = useState(true)
    const [emailValue, setEmailValue] = useState('')

  // const onChangeInput = (e, employeeId) => {
  //   const { username, value } = e.target
  //
  //   const editData = employeeData.map((item) =>
  //     item.employeeId === employeeId && username ? { ...item, [username]: value } : item
  //   )
  //
  //   setEmployeeData(editData)
  // }
    function formHander(){
      //save form

    }
    function toggleEmail() {
        setEmailInput(!emailInput)

    }

    console.log('data',data)

  return (
    <Container>
      <h1 className="title">User Profile</h1>
      <d1>Double click on text to edit major or graduation year </d1>
      
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
                 <input type="text" onclick={{}}/>
             </td>
         </tr>
         
         <tr>
             <td>
                Graduation Year:
             </td>
             <td>
                 <input type="text" onclick={{}}/>
             </td>
         </tr>
        

         <Button onclick={{}}>Save Changes</Button>
     </table>

      <br/>
      <br/><br/><br/><br/><br/>
    </Container>
  )
}

