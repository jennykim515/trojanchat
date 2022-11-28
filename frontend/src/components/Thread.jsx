import Card from '@mui/material/Card'
import { CardActionArea } from '@mui/material'
import './Thread.css';
import { useNavigate } from "react-router-dom";

// props: title, userName, timeCreated, comments
const Thread = (props) => {

    const threadinfo = props.threadInfo

    const navigate = useNavigate();

    return (
        <Card variant="outlined">
            <CardActionArea onClick={() => {navigate(`/${threadinfo.title}`);}}>
            <div className="threads-container">
                    <div className="thread-card-top"><h2>{threadinfo.title}</h2></div>
                    <div className="thread-card-bottom">
                        <div className="bottom-left"> <p>by {threadinfo.userName}</p></div>
                        <div className="bottom-right"><p>Time {threadinfo.timeCreated}</p></div>
                    </div>
            </div>
            </CardActionArea>
        </Card>
    )
}

export default Thread;