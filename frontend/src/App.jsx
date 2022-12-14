import './App.css';
import React, { useContext, useEffect } from 'react';
import { createContext, useState } from 'react';
import ChatThread from '../src/pages/ChatThreads';
import {
    BrowserRouter,
    MemoryRouter as Router,
    Route,
    Routes,
} from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import UserProfile from './pages/user/UserProfile';
import MainNavigation from './pages/MainNavigation';
import School from './components/School';
import SchoolSpecificThread from './pages/SchoolSpecificThread';
import Navbar from './components/navbar/navbar';
import {
    internal_apiGet,
    internal_apiPost,
    internal_apiPut,
} from './utils/network';
import OtherUser from './pages/user/OtherUser';
import CommentList from './pages/CommentList';
import { useNavigate } from 'react-router-dom';
import AddThread from './pages/AddThread/AddThread';

export const AppContext = createContext({});

const TOKEN_KEY = 'chatToken';
const USER_ID = 'userID';

function App() {
    const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
    const [userId, setUserId] = useState(localStorage.getItem(USER_ID) || '');
    const [user, setUser] = useState({});
    const type = {
        Default: 0,
        Registration: 1,
        Profile: 2,
        Comments: 3,
    };
    const [navType, setNavType] = useState(type.Default);
    const myUserId = user?.id || '';
    // exampleUser: {
    //   id: j32342l2ljf
    //   name: "Trojan",
    //   major: "Computer Science",
    //   username: "tjan",
    //   grad: "2024",
    //   password: "password"
    // }

    const loggedIn = token !== '' && userId !== '';

    // Authenticated wrapper for GET requests
    const apiGet = async (path, userId = myUserId, options = {}) => {
        const response = await internal_apiGet(path, userId, token, options);
        return response;
    };

    // Authenticated wrapper for POST requests
    const apiPost = async (path, data, userId = myUserId, options = {}) => {
        const response = await internal_apiPost(
            path,
            data,
            userId,
            token,
            options
        );
        return response;
    };

    // Authenticated wrapper for POST requests
    const apiPut = async (path, data, userId = myUserId, options = {}) => {
        const response = await internal_apiPut(
            path,
            data,
            userId,
            token,
            options
        );
        return response;
    };

    // Log in the user with the given username and password
    const logIn = async (username, password) => {
        const { status, ...user } = await apiGet(
            `/account/verify?username=${username}&password=${password}`
        );
        if (status === 200) {
            const { userId } = user;
            const newToken = `${username}+${password}`;
            localStorage.setItem(TOKEN_KEY, newToken);
            localStorage.setItem(USER_ID, userId);
            setToken(newToken);
            setUserId(userId);
            setUser(user);
            return true;
        }

        return false;
    };

    // Log out the user
    const logOut = () => {
        //apiPost('/auth/logout');
        localStorage.removeItem(TOKEN_KEY);
        setToken('');
        setUser(null);
        // window.location.reload();
    };

    // Fetch the user when the page is loaded if we have a token
    useEffect(() => {
        if (loggedIn) {
            apiGet(`/account/view?id=${userId}`)
                .then(({ status, ...newUser }) => {
                    if (status !== 200) throw new Error('Failed to fetch user');
                    setUser(newUser);
                    console.log(newUser);
                })
                .catch((e) => {
                    console.error(e);
                    logOut();
                });
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                apiGet,
                apiPost,
                apiPut,
                logIn,
                loggedIn,
                logOut,
                user,
                navType,
                setNavType,
            }}
        >
            <BrowserRouter>
                {/* <Navbar navType={navType} setNavType={setNavType} /> */}
                <Routes>
                    <Route path="/login" element={<LogIn />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>

                    {/* If signed in */}
                    <Route path="" element={<MainNavigation />} />
                    <Route path="/:school" element={<SchoolSpecificThread />} />
                    <Route path="/:school/:thread" element={<CommentList />} />

                    <Route path={'/profile'} element={<UserProfile />}></Route>
                    <Route path="/profile/mythreads" element={<ChatThread />} />
                    <Route
                        path={'/user/:userId'}
                        element={<OtherUser />}
                    ></Route>

                    <Route
                        path={'/addthread/:school'}
                        element={<AddThread />}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};

// Here's an example of a component that uses the context
function DemoComponent() {
    const { apiGet, apiPost, logIn, loggedIn, logOut, user } = useApp();

    const [data, setData] = useState(null);

    const fetchData = async () => {
        const { status, data } = await apiGet('/some/api/path?someQuery=123');
        if (status === 200) {
            setData(data);
        } else {
            // handle error
        }
    };

    useEffect(() => {
        if (loggedIn && !data) {
            fetchData();
        }
    }, [loggedIn, data]);

    if (!data) {
        return null;
    }

    return (
        <div>
            <h1>Hi {data.name}!</h1>
            <button onClick={logOut}>Log out</button>
        </div>
    );
}
