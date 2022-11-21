import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App'
import Thread from "../components/Thread";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

/*
    Displays all of User's Threads
*/
export default function UserThreads() {
    const [threadData, setThreadData] = useState([]);
    
    useEffect(() => {
        getThreadData();
    }, [])

    const getThreadData = () => {
        // [GET] api call to fetch info about other user's thread /account/posts
        // userName, title, timeCreated, comments
        const url = '/account/posts'

        setThreadData([
            {
                title: "Title 1",
                userName: "Username 1",
                timeCreated: '07/28/2001',
                comments: [
                    "hello", "how are you"
                ]
            },
            {
                title: "Title 2",
                userName: "Username 2",
                timeCreated: '07/28/2001',
                comments: [
                    "hello", "how are you"
                ]
            },
            {
                title: "Title 3",
                userName: "Username 3",
                timeCreated: '07/28/2001',
                comments: [
                    "hello", "how are you"
                ]
            },

        ]);
    }
    const { user } = useContext(AppContext)
    // console.log(user);
    return (
        <Container>
            <h1>{user.name}'s Threads</h1>
            <Button variant="contained">Return to Profile</Button>

            {threadData && threadData.map((thread, i) => {
                return (<Thread 
                    key={i}
                    threadInfo={thread} 
                />)
            })}
        </Container>
    )
}