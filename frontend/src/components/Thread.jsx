import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import './Thread.css';
import { useLocation, useNavigate } from 'react-router-dom';

// props: title, userName, timeCreated, comments
const Thread = (props) => {
    const threadinfo = props.threadInfo;

    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Card variant="outlined">
            <CardActionArea
                onClick={() => {
                    navigate(`${location.pathname}/${threadinfo.postId}`);
                }}
            >
                <div className="threads-container">
                    <div className="thread-card-top">
                        <h2>{threadinfo.content}</h2>
                    </div>
                    <div className="thread-card-bottom">
                        <div className="bottom-left">
                            {' '}
                            <p>by {threadinfo.userName || threadinfo.userId}</p>
                        </div>
                        <div className="bottom-right">
                            <p>Time: {threadinfo.timestamp}</p>
                        </div>
                    </div>
                </div>
            </CardActionArea>
        </Card>
    );
};

export default Thread;
