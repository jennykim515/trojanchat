import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Thread from '../components/Thread';
import Container from '@mui/material/Container';
import { useApp } from '../App';
import { __DEV__ } from '../utils/network';
import Button from '../components/buttons/buttons';
import Navbar from '../components/navbar/navbar';
import Loading from '../components/Loading';
<<<<<<< HEAD
import {Link} from 'react-router-dom';
=======
import AddThreadButton from '../components/AddThreadButton';
import './SchoolSpecificThread.css';
>>>>>>> main

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
    const [filters, setFilters] = useState(
        JSON.parse(localStorage.getItem('filters')) || []
    );
    const [pref, setPref] = useState(Boolean(filters.length));
    console.log(pref);
    const [tempFilters, setTempFilters] = useState(filters);
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

    useEffect(() => {
        if (tempFilters.length) {
            const timeout = setTimeout(() => {
                const newVal = tempFilters[0] !== '' ? tempFilters : [];
                setFilters(newVal);

                if (pref) {
                    localStorage.setItem('filters', JSON.stringify(newVal));
                }
            }, 300);
            return () => clearTimeout(timeout);
        }
    }, [tempFilters, pref]);

    return (
        <>
<<<<<<< HEAD
         <Navbar navType={navType} setNavType={setNavType} />
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

            <Link to={"/addthread/" + school}>
            <button>Create Thread</button>
            </Link>

            {!loading ? (
                <>
                    {Object.values(schoolThreads).map((thread, i) => {
                        return <Thread threadInfo={thread} key={i} />;
                    })}
                    {!Object.values(schoolThreads).length && (
                        <h2>No threads found.</h2>
                    )}
                </>
            ) : (
                <Loading />
            )}
        </Container>
=======
            <Navbar navType={1} />
            <Container>
                <h1 className="boardTitle">{school}</h1>
                <div id="filterContainer">
                    <div id="filterTagContainer">
                        <p>Filter by tag:</p>
                        <input
                            placeholder="ex: csci"
                            value={tempFilters[0] || ''}
                            onChange={(e) => {
                                setTempFilters([e.target.value]);
                            }}
                        />
                    </div>
                    <div id="filterPref">
                        <p>Set as preference:</p>
                        <input
                            type="checkbox"
                            value={pref}
                            defaultChecked={pref}
                            onChange={(e) => {
                                if (pref) {
                                    setPref(0);
                                    localStorage.removeItem('filters');
                                } else {
                                    setPref(1);
                                    localStorage.setItem(
                                        'filters',
                                        JSON.stringify(filters)
                                    );
                                }
                            }}
                        />
                    </div>
                    <div className="right">
                        <AddThreadButton />
                    </div>
                </div>
                {!loading ? (
                    <>
                        <div id="filterContainer"></div>
                        {Object.values(schoolThreads).map((thread, i) => {
                            return <Thread threadInfo={thread} key={i} />;
                        })}
                        {!Object.values(schoolThreads).length && (
                            <h2>No threads found.</h2>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </Container>
>>>>>>> main
        </>
    );
}
