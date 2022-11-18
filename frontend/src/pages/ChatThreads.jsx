import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App'
import Thread from "../components/Thread";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

export default function ChatThreads() {
    const [threadData, setThreadData] = useState([]);

    useEffect(() => {
        getThreadData();
    }, [])

    const getThreadData = () => {
        // api call
        setThreadData([
            {
                title: "Title 1",
                username: "Username 1"
            },
            {
                title: "Title 2",
                username: "Username 2"
            },
            {
                title: "Title 3",
                username: "Username 3"
            },

        ]);
    }
    const { user } = useContext(AppContext)
    console.log(user);
    return (
        <Container>
            <h1>{user.name}'s Threads</h1>
            <Button variant="contained">Return to Profile</Button>

            {threadData.map((thread, i) => {
                return (<Thread threadInfo={thread}/>)
            })}
        </Container>
    )
}