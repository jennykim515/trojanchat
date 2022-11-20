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
        setSchools([
            {
                school: "General",
                numThreads: 34552
            },
            {
                school: "Dornsife",
                numThreads: 52
            },
            {
                school: "Viterbi",
                numThreads: 305,
                
            },

        ]);
    }

    const { user } = useContext(AppContext)
    console.log(user);
    return (
        <Container>
            <h1>USC</h1>
            {schools.map((schoolData, i) => {
                return (
                    <School schoolInfo={schoolData} />
                )
            })}

        </Container>
    )
}