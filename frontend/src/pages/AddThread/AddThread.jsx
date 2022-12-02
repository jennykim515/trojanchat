import { useState, useContext, useEffect } from "react";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { useApp } from '../../App';


export default function AddThreads({props}) {

    const [titleInput, setTitleInput] = useState(""); 
    const [tagInput, setTagInput] = useState(""); 
    const [bodyInput, setBodyInput] = useState(""); 

    const formHandler = async (e) => {
    }

return (
    <Container>
      <div id = "Info">
      <h1 className="title">Add Thread</h1>
      <form onSubmit={formHandler}>
        <fieldset>
          <label >Titles: </label>
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
    </Container>

  )
  }
