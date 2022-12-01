import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App'
import Thread from "../components/Thread";
import Container from '@mui/material/Container'
import Button from "../components/buttons/buttons";
import { useApp } from "../App";
import Navbar from "../components/navbar/navbar";
/*
    Displays all of User's Threads
*/
export default function UserThreads() {
    const app = useApp()
    const [threadData, setThreadData] = useState([]);
    
    useEffect(() => {
        getThreadData();
    }, [])

    const getThreadData = async () => {
        // [GET] api call to fetch info about other user's thread /account/posts
        // userName, title, timeCreated, comments
        const url = `/account/posts?id=${user.id}`
        const {status, ...data} = await app.apiGet(url)
        if(status === 200) {
            setThreadData(data)
        }

        
    }
    const { user } = useContext(AppContext)
    const [navType, setNavType] = useState(0);
    return (
        <>
         <Navbar navType={navType} setNavType={setNavType} />
        <Container>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1 style={{margin: "12px", fontFamily: "Helvetica", flex: "flex-start"}}>{user.name || user.id}'s Threads</h1>
                {/* <Button type="RED" text="Return to Profile" /> */}
            </div>
            
            {threadData && (Object.keys(threadData).map((key, i) => {
                return <Thread key={i} threadInfo={threadData[key]} />
            }))}
        </Container>
        </>
    )
}