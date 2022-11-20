import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";

/*
    props: {boardName, threadCount}
*/
const School = (props) => {
    const navigate = useNavigate();

    const schoolInfo = props.schoolInfo
    return (
        <Card variant="outlined">
            <h2>{schoolInfo.boardName}</h2>
            <p>Thread Count: {schoolInfo.threadCount}</p>
            <Button 
                variant="outlined"
                onClick={() => {
                    navigate(`/${schoolInfo.boardName}`);
                }}
            >View More</Button>
        </Card>
    )
}

export default School;