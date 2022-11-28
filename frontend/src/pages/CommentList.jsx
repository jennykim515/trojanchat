import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import Comment from "../components/Comment";
import Container from '@mui/material/Container'

/*
    Displays all comments of a particular thread
*/
export default function CommentList() {
    let {thread} = useParams();

    const [PostData, setPostData] = useState([])

    useEffect(() => {
        getPostData();
        console.log(thread)
    }, [])

    function getPostData() {
        // [GET] api call to fetch info about comments in a particular thread for a particular board
        // content, userName, timeCreated
        const url = '' /*/post/view*/
        /*Json returns: In a Map Style
        {“post” : {Post Object}, “comments”: {List<Comment Object>}*/

        setPostData([
            {
                userName: '3456754',
                content: "hi, how are you?",
                timeCreated: "07/28/2001"
            },
            {
                userName: '3456754',
                content: "good, and you?",
                timeCreated: "07/28/2001"
            },
        ]);
    }

    return (
        <Container>
        <h1 style={{margin: "12px", fontFamily: "Helvetica", flex: "flex-start"}}>{thread}</h1>
        {PostData.map((comment, i) => {
            return (<Comment 
                key={i}
                commentInfo={comment}
            />)
        })}
        </Container>
    )
}
