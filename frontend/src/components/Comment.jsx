import Card from '@mui/material/Card';
import './Comment.css';

// props: content, userName, timeCreated
const Comment = (props) => {
    const commentinfo = props.commentInfo;

    return (
        <Card variant="outlined">
            <div className="comment-container">
                <div className="comment-card-top">
                    <h2>{commentinfo.comment}</h2>
                </div>
                <div className="comment-card-bottom">
                    <div className="bottom-left">
                        {' '}
                        <p>by {commentinfo.userName}</p>
                    </div>
                    <div className="bottom-right">
                        <p>Time {commentinfo.timeCreated}</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Comment;
