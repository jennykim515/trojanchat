import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Thread from '../components/Thread';
import Container from '@mui/material/Container';
import Button from '../components/buttons/buttons';
import { useApp } from '../App';
import Loading from '../components/Loading';

/*
    Displays all of User's Threads
*/
export default function UserThreads() {
    const app = useApp();
    const [threadData, setThreadData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getThreadData();
    }, []);

    const getThreadData = async () => {
        // [GET] api call to fetch info about other user's thread /account/posts
        // userName, title, timeCreated, comments
        const url = `/account/posts?id=${user.userId}`;
        const { status, ...data } = await app.apiGet(url);
        if (status === 200) {
            setThreadData(data);
            setLoading(false);
        }
    };
    const { user } = useContext(AppContext);

    return (
        <Container>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <h1 className="boardTitle">
                    {user.username || user.userId}'s Threads
                </h1>
                <Button type="RED" text="Return to Profile" />
            </div>

            {!loading && threadData ? (
                Object.keys(threadData).map((key, i) => {
                    return <Thread key={i} threadInfo={threadData[key]} />;
                })
            ) : (
                <Loading />
            )}
        </Container>
    );
}
