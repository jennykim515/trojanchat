import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'


const data = [
  {
    employeeId:'01',
    username: 'John Doe',
    email: 'johndoe@email.com',
    major: 'Frontend Developer',
    graduation: 'something'
  },
]
export default function UserProfile() {
  const [employeeData, setEmployeeData] = useState(data)

  const onChangeInput = (e, employeeId) => {
    const { username, value } = e.target

    const editData = employeeData.map((item) =>
      item.employeeId === employeeId && username ? { ...item, [username]: value } : item
    )

    setEmployeeData(editData)
  }

  return (
    <div className="container">
      <h1 className="title">ReactJS Editable Table</h1>
      <table>
        <thead>
          <tr>
            <th>Username:</th>
            <th>Email:</th>
            <th>Major:</th>
            <th>Graduation Year:</th>
          </tr>
        </thead>
        <tbody>
          {employeeData.map(({ employeeId, username, email, major, graduation }) => (
            <tr key={employeeId}>
              <td>
                <input
                  name="username"
                  value={username}
                  type="text"
                  onChange={(e) => onChangeInput(e, employeeId)}
                  placeholder="Type Username"
                />
              </td>
              <td>
                <input
                  name="email"
                  value={email}
                  type="text"
                  onChange={(e) => onChangeInput(e, employeeId)}
                  placeholder="Type Email"
                />
              </td>
              <td>
                <input
                  name="major"
                  type="text"
                  value={major}
                  onChange={(e) => onChangeInput(e, employeeId)}
                  placeholder="Type Major"
                />
              </td>
              <td>
                <input
                  name="graduation"
                  type="text"
                  value={graduation}
                  onChange={(e) => onChangeInput(e, employeeId)}
                  placeholder="Type Graduation Year"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

