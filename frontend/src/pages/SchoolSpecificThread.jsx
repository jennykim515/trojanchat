import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import Container from '@mui/material/Container';
import { useApp } from '../App';
import { __DEV__ } from '../utils/network';

const DEFAULT_DATA = [
    {
        title: 'Title 1',
        userName: 'Username 1',
        timeCreated: '07/28/2002',
        comments: [],
    },
    {
        title: 'Title 2',
        userName: 'Username 2',
        timeCreated: '07/28/2002',
        comments: [],
    },
    {
        title: 'Title 3',
        userName: 'Username 3',
        timeCreated: '07/28/2002',
        comments: [],
    },
];

export default function SchoolSpecificThread() {
    let { school } = useParams();
    const { apiGet } = useApp();

    let [schoolThreads, setSchoolThreads] = useState([]);
    const [filters, setFilters] = useState([]);

    // load threads about this particular school
    const getSchoolThreads = async () => {
        const filterString = filters.length ? filters.join(',') : '_none';
        const { status, data } = await apiGet(
            `/feed/board?school=${school}&filter=${filterString}`
        );
        if (status === 200) {
            setSchoolThreads(data);
        } else {
            if (__DEV__) setSchoolThreads(DEFAULT_DATA);
        }
    };

    useEffect(() => {
        getSchoolThreads();
    }, [filters, school]);

    return (
        <Container>
            <h1
                style={{
                    margin: '12px',
                    fontFamily: 'Helvetica',
                    flex: 'flex-start',
                }}
            >
                {school}
            </h1>
            {schoolThreads.map((thread, i) => {
                return (
                    <Thread
                        threadInfo={thread}
                        key={thread.title + thread.userName}
                    />
                );
            })}
        </Container>
    );
}
