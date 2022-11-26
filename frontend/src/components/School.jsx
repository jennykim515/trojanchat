import Card from '@mui/material/Card'
import { CardActionArea, CardMedia } from '@mui/material';
import { useNavigate } from "react-router-dom";
import "./School.css";

/*
    props: {boardName, threadCount}
*/


const School = (props) => {
    const navigate = useNavigate();

    const schoolInfo = props.schoolInfo
    return (
        <Card variant="outlined" >
            <CardActionArea onClick={() => {navigate(`/${schoolInfo.boardName}`);}}>
                <CardMedia height="140" outline=""/>
                <div className="container">
                <div className="left"><h2>{schoolInfo.boardName}</h2></div>
                <div className="right"><p>Thread Count: {schoolInfo.threadCount}</p></div>
                </div>
            </CardActionArea>
        </Card>
    )
}

export default School;