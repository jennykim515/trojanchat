import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import Thread from "../components/Thread";
import Container from '@mui/material/Container'


export default function SchoolSpecificThread() {
    let {school} = useParams();  

    let [schoolThreads, setSchoolThreads] = useState([]);

    // load threads about this particular school
    useEffect(() => {
        getSchoolThreads();
        console.log(school)
    }, [])

    const getSchoolThreads = () => {
        // [GET]
        const url = ''
        setSchoolThreads([
            {
                title: "Title 1",
                userName: "Username 1",
                timeCreated: '07/28/2002',
                comments: []
            },
            {
                title: "Title 2",
                userName: "Username 2",
                timeCreated: '07/28/2002',
                comments: []
            },
            {
                title: "Title 3",
                userName: "Username 3",
                timeCreated: '07/28/2002',
                comments: []
            }
        ])
    }

    return (
        <Container>
            <h1>{school}</h1>
            {schoolThreads.map((thread, i) => {
                return (
                    <Thread threadInfo={thread} />
                )
            })}
        </Container>
    )
}