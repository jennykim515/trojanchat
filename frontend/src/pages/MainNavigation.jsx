import { useState, useContext, useEffect } from "react";
import { AppContext } from '../App'
import Thread from "../components/Thread";
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import School from "../components/School";

/*
    Displays the main navigation board (with different schools) 
*/
export default function MainNavigation() {
    const [schools, setSchools] = useState([]);

    useEffect(() => {
        getSchoolData();
    }, [])

    const getSchoolData = () => {
        const url = '/feed/home'
        /*
            Json returns List<Object>
            Object: {boardName, threadCount}
        */
        setSchools([
            {
                boardName: "General",
                threadCount: 34552
            },
            {
                boardName: "Dornsife",
                threadCount: 52
            },
            {
                boardName: "Viterbi",
                threadCount: 305,
                
            },

        ]);
    }

    // const { user } = useContext(AppContext)
    // console.log(user);
    return (
        <Container>
            <h1>USC</h1>
            {schools.map((schoolData, i) => {
                return (
                    <div>
                        <School key={i} schoolInfo={schoolData} />
                    </div>
                )
            })}
        </Container>
    )
}