import { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button as MUIButton } from '@mui/material/Button';
import { useApp } from '../../App';
import Navbar from '../../components/navbar/navbar';
import "../AddThread/AddThread.css";
import { v4 as uuidv4 } from 'uuid';
import School from "../../components/School";
import { useParams, useNavigate } from 'react-router-dom';


export default function AddThreads({props}) {

    const navigate = useNavigate();
    let { school } = useParams();
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(true);
    const { apiPost, user, token, userId, apiGet } = useApp();
    const [titleInput, setTitleInput] = useState(""); 
    const [tagInput, setTagInput] = useState(""); 
    const [bodyInput, setBodyInput] = useState(""); 

    const formHandler = async (e) => {
      const { status, ...data } = await apiPost('/post/create', {
        content: titleInput,
        tags: tagInput.split(' '),
        postId: uuidv4(),
        school: school,
        timestamp: Date.now(),
        upvotes: 1,
        userId: user.userId,
    });
    if (status === 200) {
        //window.location = `/all/${data.postId}`;
        navigate(`/${"/" + school}`);
    } else {
        alert('Error creating thread');
    }
    }

    useEffect(()=>{
      console.log(user, token, userId);
  
      //user.id
      fetch('https://trojanchat.wl.r.appspot.com/api/account/view?id=' + user.id)
      .then(response=> response.json())
      .then(data =>{
        console.log(data)
      })
  
     },[])

  
    const [navType, setNavType] = useState(2);

return (
      <div id = "Info">
      <Navbar navType={navType} setNavType={setNavType} />
      <h1 id = "title"> Create New Thread in USC - {school}</h1>
      <form onSubmit={formHandler}>
        <fieldset>
          <label id="title">Titles: </label>
          <input 
                        type="text" 
                        value={titleInput} 
                        onChange={(e) => setTitleInput(e.target.value)} 
                        marginBottom="10px"/>
        </fieldset>
        <fieldset>
          <label >Tag: </label>
          <input 
                        type="text" 
                        value={tagInput} 
                        onChange={(e) => setTagInput(e.target.value)} 
                        marginBottom="10px"/>
        </fieldset>
        <fieldset>
          <label >Body: </label>
          <input 
                        type="text" 
                        value={bodyInput} 
                        onChange={(e) => setBodyInput(e.target.value)} 
                        marginBottom="10px"/>
        </fieldset>
        <fieldset>
        <button className="btn" type="submit">Save Changes</button>
        </fieldset>
     </form>
      <br/>
      <br/><br/><br/><br/><br/>
      </div>
  )
  }
