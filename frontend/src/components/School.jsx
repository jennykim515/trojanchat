import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useNavigate } from "react-router-dom";


const School = (props) => {
    console.log(props);
    const navigate = useNavigate();

    const schoolInfo = props.schoolInfo
    return (
        <Card variant="outlined">
            <h2>{schoolInfo.school}</h2>
            {/* <p>by {schoolInfo.username}</p> */}
            <Button 
                variant="outlined"
                onClick={() => {
                    navigate(`/${schoolInfo.school}`);
                }}
            >View More</Button>
        </Card>
    )
}

export default School;