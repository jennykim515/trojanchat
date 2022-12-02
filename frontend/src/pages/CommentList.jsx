import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment';
import Container from '@mui/material/Container';
import { useApp } from '../App';
import AddComment from '../components/AddComment';
import { AppContext } from '../App';

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
    const { apiGet } = useApp();
    const { setNavType } = useContext(AppContext);

    useEffect(() => {
        setNavType(3);
    }, []);

    const [PostData, setPostData] = useState({});
    console.log(PostData);
    const post = PostData.post;
    const comments = PostData.comments || [];

    useEffect(() => {
        getPostData();
    }, [thread]);

    const getPostData = async () => {
        const { status, ...data } = await apiGet(`/post/view?postId=${thread}`);
        if (status === 200) {
            Object.keys(data).forEach((key) => {
                if (typeof data[key] === 'string') {
                    data[key] = JSON.parse(data[key]);
                }
            });
            setPostData(data);
        } else {
            setPostData(DEFAULT_DATA);
        }
    };

    const addComment = (comment) => {
        setPostData({
            ...PostData,
            comments: [...comments, comment],
        });
    };

    if (!post) return null;

    return (
        <Container>
            <h1 className="boardTitle">{post.content}</h1>
            {comments &&
                comments.map((comment, i) => {
                    return (
                        <div
                            key={
                                post.postId +
                                comment.commenterUserName +
                                comment.commentId
                            }
                        >
                            <Comment commentInfo={comment} />
                        </div>
                    );
                })}
            <br></br>
            <AddComment addComment={addComment} />
        </Container>
    );
}
