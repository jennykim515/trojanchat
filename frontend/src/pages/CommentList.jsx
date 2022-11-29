import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Comment from "../components/Comment";
import Container from '@mui/material/Container'

/*
    Displays all comments of a particular thread
*/

/*const DEFAULT_DATA = [
    {
        title: "post1",
        userName: "user0",
        timeCreated: "11/29/2012",
        content: [
            {title: "post1", userName: "user1", commentId: "1", timeCreated: "12/01/2012", comment: "hello!"},
            {title: "post1", userName: "user2", commentId: "2", timeCreated: "12/02/2012", comment: "hi!"},
        ]
    },
    {
        title: "post2",
        userName: "user1",
        timeCreated: "12/02/2012",
        content: [
            {title: "post2", commenteruserName: "user3", commentId: "3", timeCreated: "12/04/2012", comment: "hi!"},
            {title: "post2", commenteruserName: "user2", commentId: "4", timeCreated: "12/05/2012", comment: "hello."},
        ]
    },
];*/

export default function CommentList() {
    let { thread } = useParams();

    const [PostData, setPostData] = useState([])

    useEffect(() => {
        getPostData();
        console.log(thread)
    }, [thread])

    function getPostData() {
        // [GET] api call to fetch info about comments in a particular thread for a particular board
        // content, userName, timeCreated
        /*const url = '' /post/view*/
        /*Json returns: In a Map Style
        {“post” : {Post Object}, “comments”: {List<Comment Object>}*/

        setPostData([
            {
                title: "post1",
                userName: "user0",
                timeCreated: "11/29/2012",
                content: [
                    {title: "post1", userName: "user1", commentId: "1", timeCreated: "12/01/2012", comment: "hello!"},
                    {title: "post1", userName: "user2", commentId: "2", timeCreated: "12/02/2012", comment: "hi!"},
                ]
            },
            {
                title: "post2",
                userName: "user1",
                timeCreated: "12/02/2012",
                content: [
                    {title: "post2", commenterUserName: "user3", commentId: "3", timeCreated: "12/04/2012", comment: "hi!"},
                    {title: "post2", commenterUserName: "user2", commentId: "4", timeCreated: "12/05/2012", comment: "hello."},
                ]
            },
        ]);
    }

    return (
        <Container>
        <h1 style={{margin: "12px", fontFamily: "Helvetica", flex: "flex-start"}}>{thread}</h1>
        {PostData.map((post, i) => {
                return(
                    <div key={post.title + post.userName}>
                        <Comment 
                            key={post.content.title + post.content.commenterUserName + post.content.commentId}
                            commentInfo={post.content.comment} 
                            
                         />
                    </div>
                )
            })
        }
        </Container>
    )
}

/*{PostData.map((comment, i) => {
    return (<Comment 
        key={i}
        commentInfo={comment}
    />)
})}*/