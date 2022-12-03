import { useState, useContext, useEffect } from 'react';
import { AppContext } from '../App';
import Thread from '../components/Thread';
import Container from '@mui/material/Container';
import Button from '../components/buttons/buttons';
import { useApp } from '../App';
import Navbar from '../components/navbar/navbar';
import Loading from '../components/Loading';
import { Navigate, useNavigate } from 'react-router-dom';
/*
    Displays all of User's Threads
*/
export default function UserThreads() {
    const { apiGet, user } = useApp();
    const [threadData, setThreadData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        getThreadData();
    }, []);

    const getThreadData = async () => {
        // [GET] api call to fetch info about other user's thread /account/posts
        // userName, title, timeCreated, comments
        const url = `/account/posts?id=${user.userId}`;
        const { status, ...data } = await apiGet(url);
        if (status === 200) {
            setThreadData(data);
            setLoading(false);
        }
    };

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
                <Button
                    type="RED"
                    text="Return to Profile"
                    onClick={() => navigate(-1)}
                />
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
