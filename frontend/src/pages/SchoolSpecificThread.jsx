import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"
import Thread
 from "../components/Thread";
export default function SchoolSpecificThread() {
    let {school} = useParams();  
    let [schoolThreads, setSchoolThreads] = useState([]);

    // load threads about this particular school
    useEffect(() => {
        getSchoolThreads();
    }, [])

    const getSchoolThreads = () => {
        setSchoolThreads([
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
            }
        ])
    }

    return (<>
        <h1>{school}</h1>
        {schoolThreads.map((thread, i) => {
            return (
                <Thread threadInfo={thread} />
            )
        })}
        </>
    )
}