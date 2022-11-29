import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import Container from '@mui/material/Container';

/*
    Displays all comments of a particular thread
*/

const DEFAULT_DATA = {
    post: {
        title: 'post1',
        userName: 'user0',
        timeCreated: '11/29/2012',
    },
    comments: [
        {
            title: 'post1',
            userName: 'user1',
            commentId: '1',
            timeCreated: '12/01/2012',
            comment: 'hello!',
        },
        {
            title: 'post1',
            userName: 'user2',
            commentId: '2',
            timeCreated: '12/02/2012',
            comment: 'hi!',
        },
    ],
};

export default function CommentList() {
    let { thread } = useParams();

    const [PostData, setPostData] = useState({});
    const post = PostData.post;
    const comments = PostData.comments;

    useEffect(() => {
        getPostData();
        console.log('THREAD', thread);
    }, [thread]);

    function getPostData() {
        // [GET] api call to fetch info about comments in a particular thread for a particular board
        // content, userName, timeCreated
        /*const url = '' /post/view*/
        /*Json returns: In a Map Style
        {“post” : {Post Object}, “comments”: {List<Comment Object>}*/

        setPostData(DEFAULT_DATA);
    }

    return (
        <Container>
            <h1
                style={{
                    margin: '12px',
                    fontFamily: 'Helvetica',
                    flex: 'flex-start',
                }}
            >
                {thread}
            </h1>
            {comments &&
                comments.map((comment, i) => {
                    console.log(comment);
                    return (
                        <div
                            key={
                                post.title +
                                comment.commenterUserName +
                                comment.commentId
                            }
                        >
                            <Comment commentInfo={comment} />
                        </div>
                    );
                })}
        </Container>
    );
}

/*{PostData.map((comment, i) => {
    return (<Comment 
        key={i}
        commentInfo={comment}
    />)
})}*/
