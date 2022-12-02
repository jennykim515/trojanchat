import { useState, useContext, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button as MUIButton } from '@mui/material/Button';
import { useApp } from '../../App';
import Button from '../../components/buttons/buttons';
import Loading from '../../components/Loading';
import { v4 as uuidv4 } from 'uuid';
import { getTimestamp } from '../../utils/time';

export default function AddThreads({ props }) {
    const { apiPost, user } = useApp();
    const [loading, setLoading] = useState(false);

    const [titleInput, setTitleInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [bodyInput, setBodyInput] = useState('');

    const createThread = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { status, ...data } = await apiPost('/post/create', {
            content: titleInput,
            tags: tagInput.split(' '),
            postId: uuidv4(),
            school: 'general',
            timestamp: getTimestamp(),
            upvotes: 1,
            userId: user.userId,
        });
        if (status === 200) {
            window.location = `/all/${data.postId}`;
        } else {
            alert('Error creating thread');
        }

        setLoading(false);
    };

    return (
        <Container>
            <div id="Info">
                <h1 className="title">Add Thread</h1>
                <form onSubmit={createThread}>
                    <fieldset>
                        <label>Titles: </label>
                        <input
                            type="text"
                            value={titleInput}
                            onChange={(e) => setTitleInput(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Tag: </label>
                        <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <label>Body: </label>
                        <input
                            type="text"
                            value={bodyInput}
                            onChange={(e) => setBodyInput(e.target.value)}
                        />
                    </fieldset>
                    {!loading ? (
                        <fieldset>
                            <Button onClick={createThread}>Save Changes</Button>
                        </fieldset>
                    ) : (
                        <Loading />
                    )}
                </form>
                <br />
            </div>
        </Container>
    );
}
