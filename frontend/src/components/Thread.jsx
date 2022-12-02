import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import './Thread.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Upvote from './Upvote';
import { useState } from 'react';
import { useApp } from '../App';
import Tag from './tagShape/Tag';

// props: title, userName, timeCreated, comments
const Thread = (props) => {
    const threadinfo = props.threadInfo;

    const navigate = useNavigate();
    const location = useLocation();
    const { apiPost } = useApp();

    const [votes, setVotes] = useState({});
    const sendVoteCallback = async (postId, numVotes) => {
        setVotes(oldVotes=>({
            ...oldVotes,
            [postId]: Number(oldVotes[postId]||0)+numVotes
        }));
    }

    return (
        <Card variant="outlined">
            <CardActionArea
                onClick={() => {
                    navigate(`${location.pathname}/${threadinfo.postId}`);
                }}
            >
                <div className="threads-container">
                    <Upvote post={threadinfo} votes={votes} sendVoteCallback={sendVoteCallback} />
                    <div className='threads-text'>
                    <div className="thread-card-top">
                        <h2>{threadinfo.content}</h2>

                        <div className="tagcontainer">
                            {threadinfo.tags.map((tag, i) => {
                                return(<Tag key={i} props={tag} />)
                                console.log(tag)
                            })}
                        </div>
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
                </div>
            </CardActionArea>
        </Card>
    );
};

export default Thread;
