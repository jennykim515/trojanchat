import { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useApp } from "../../App";
import { AppContext } from "../../App";
import Navbar from "../../components/navbar/navbar";
import "../user/UserProfile.css";




const data = {
  employeeId: "01",
  username: "John Doe",
  email: "johndoe@email.com",
  major: "Frontend Developer",
  graduation: "something",
};

export default function UserProfile({ props }) {
  const { apiPost, user, token, userId} = useApp();
  const [emailInput, setEmailInput] = useState(true); //thi shide/show inputfield
  const [emailValue, setEmail] = useState(user.email);
  const [majorValue, setMajor] = useState(user.major);
  const [gradValue, setGrad] = useState(user.grad);
  const [usernameValue, setUsername] = useState(user.username);

useEffect(()=>{
  
console.log(token, userId, user)

},[])

  const formHandler = async (e) => {
    e.preventDefault();

    const { status } = await apiPost("/account/update", {
      email: emailValue,
      major: majorValue,
      graduation: gradValue,
      username: usernameValue,
    });

    if (status === 200) {
      console.log("success");
    } else {
      console.log("fail");
    }
  };
  function toggleEmail() {
    setEmailInput(!emailInput);
  }
  const [navType, setNavType] = useState(2);
  return (
    <>
      <Navbar navType={navType} setNavType={setNavType} />
      <Container>
        <h1 className="title">User Profile</h1>
        <dl>Double click on text to edit major or graduation year. </dl>
        <form onSubmit={formHandler}>
          <table>
            <tr>
              <td>Username: </td>
              <td>{data.username}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>
                {emailInput ? (
                  <span onClick={toggleEmail}>{data.email}</span>
                ) : (
                  <input type="text" />
                )}
              </td>
            </tr>
            <tr>
              <td>Major:</td>
              <td>
                <input
                  type="text"
                  value={majorValue}
                  onChange={(e) => setMajor(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </td>
            </tr>

            <tr>
              <td>Graduation Year:</td>
              <td>
                <input
                  type="text"
                  value={gradValue}
                  onChange={(e) => setGrad(e.target.value)}
                  style={{ marginBottom: "10px" }}
                />
              </td>
            </tr>
          </table>
          <Button type="submit">Save Changes</Button>
        </form>

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </>
  );
}
