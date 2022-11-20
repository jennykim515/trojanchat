import { useState, useContext, useEffect, useNavigate } from "react";
import { AppContext } from '../App'
import Thread from "../components/Thread";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

/*
    Displays all threads of school
*/
export default function SchoolDiscussionBoard(props) {    
    const [threadData, setThreadData] = useState([]);

    useEffect(() => {
        getThreadData();
    }, [])
    const getThreadData = () => {
        // [GET] api call to fetch info about threads in this school
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
    // const { user } = useContext(AppContext)
    // console.log(user);
    return (
        <Container>
            <h1>USC</h1>

            {threadData && threadData.map((thread, i) => {
                return (<Thread 
                    key={i}
                    threadInfo={thread} 
                />)
            })}
        </Container>
    )
}