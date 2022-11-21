
import { useEffect, useState } from "react";
import Container from '@mui/material/Container'

export default function PostDetail(props) {
    const id = props.id
    const [post, setPost] = useState(); // comments, title

    useEffect(() => {
        getPostInfo();
    })

    // [GET] post/view
    const getPostInfo = () => {
        
    }

    return (
        <Container>
            <h1>{post.title}</h1>
        </Container>
    )
}