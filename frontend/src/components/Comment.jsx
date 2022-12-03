import Card from '@mui/material/Card';
import './Comment.css';

// props: content, userName, timeCreated
const Comment = (props) => {
    const commentinfo = props.commentInfo;

    return (
        <Card variant="outlined">
            <div className="comment-container">
                <div className="comment-card-top">
                    <p>{commentinfo.content}</p>
                </div>
                <div className="comment-card-bottom">
                    {' '}
                    <p>by {commentinfo.userId || 'Anonymous'}</p>
                    <p>{commentinfo.timestamp}</p>
                </div>
            </div>
        </Card>
    );
};

export default Comment;
