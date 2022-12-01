import Button from './buttons/buttons';
import { TextField, Grid } from '@mui/material';
import { useState } from 'react';
import { useApp } from '../App';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

export default function AddComment() {
    const { apiPost, loggedIn, user } = useApp();
    const [comment, setComment] = useState('');
    const location = useLocation();
    const postId = location.pathname.split('/')[2];

    if (!loggedIn) {
        return (
            <div className="comment-form-container">
                <p>
                    <a href="/login">Log in</a> to Comment!
                </p>
            </div>
        );
    }

    const sendComment = async () => {
        const timestamp = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString(
            [],
            { hour: '2-digit', minute: '2-digit' }
        )}`;
        const { status, ...data } = await apiPost('/post/comment/add', {
            postId,
            content: comment,
            timestamp,
            commentId: uuidv4(),
            userId: user.id,
        });
        if (status === 200) {
            setComment('');
        } else {
            alert('Error adding comment');
        }
    };

    return (
        <form>
            <div className="comment-form-container">
                <Grid container justifyContent="center" alignItems="center">
                    <TextField
                        fullWidth
                        id="filled-multiline-flexible"
                        placeholder="Type Comment"
                        multiline
                        rows={3}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Grid item xs={3}>
                        <Button
                            type="RED"
                            text="Post Comment"
                            onClick={sendComment}
                        />
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
