import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import Container from '@mui/material/Container';
import { useApp } from '../App';
import { __DEV__ } from '../utils/network';
import Button from '../components/buttons/buttons';
import Loading from '../components/Loading';
import AddThreadButton from '../components/AddThreadButton';

const DEFAULT_DATA = [
    {
        content: 'Title 1',
        userName: 'Username 1',
        timestamp: '07/28/2002',
        comments: [],
    },
    {
        content: 'Title 2',
        userName: 'Username 2',
        timestamp: '07/28/2002',
        comments: [],
    },
    {
        content: 'Title 3',
        userName: 'Username 3',
        timestamp: '07/28/2002',
        comments: [],
    },
];

const NAME_ALIASES = {
    all: 'All Threads',
};

export default function SchoolSpecificThread() {
    let { school } = useParams();
    const { apiGet } = useApp();

    let [schoolThreads, setSchoolThreads] = useState([]);
    const [filters, setFilters] = useState([]);
    const [loading, setLoading] = useState(true);

    // load threads about this particular school
    const getSchoolThreads = async () => {
        const filterString = filters.length ? filters.join(',') : '_none';
        const { status, ...data } = await apiGet(
            `/feed/board?school=${school}&filter=${filterString}`
        );
        if (status === 200) {
            setSchoolThreads(data);
        } else {
            if (__DEV__) setSchoolThreads(DEFAULT_DATA);
        }
        setLoading(false);
    };

    useEffect(() => {
        getSchoolThreads();
    }, [filters, school]);

    return (
        <Container>
            <h1 className="boardTitle">
                {NAME_ALIASES[school.toLowerCase()] || school}
            </h1>

            {!loading ? (
                <>
                    {Object.values(schoolThreads).map((thread, i) => {
                        return <Thread threadInfo={thread} key={i} />;
                    })}
                    {!Object.values(schoolThreads).length && (
                        <h2>No threads found.</h2>
                    )}
                    <AddThreadButton />
                </>
            ) : (
                <Loading />
            )}
        </Container>
    );
}
