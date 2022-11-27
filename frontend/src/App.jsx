import './App.css';
import React, { useContext, useEffect } from 'react';
import { createContext, useState } from "react"
import { BrowserRouter, MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import UserProfile from "./pages/user/UserProfile";
import MainNavigation from './pages/MainNavigation'
import School
from './components/School';
import SchoolSpecificThread from './pages/SchoolSpecificThread';
import Navbar from './components/navbar/navbar';
import { internal_apiGet, internal_apiPost } from './utils/network';
import OtherUser from "./pages/user/OtherUser";
import CommentList from './pages/CommentList';

export const AppContext = createContext({});

const TOKEN_KEY = 'chatToken';

function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY) || '');
  const [user, setUser] = useState({});
  const myUserId = user?.id || "";
  // exampleUser: {
  //   id: j32342l2ljf
  //   name: "Trojan",
  //   major: "Computer Science",
  //   username: "tjan",
  //   grad: "2024",
  //   password: "password"
  // }

  const loggedIn = token !== '';

  // Authenticated wrapper for GET requests
  const apiGet = async (path, userId = myUserId, options = {}) => {
      const response = await internal_apiGet(path, userId, token, options);
      return response;
  };

  // Authenticated wrapper for POST requests
  const apiPost = async (path, data, userId = myUserId, options = {}) => {
      const response = await internal_apiPost(path, data, userId, token, options);
      return response;
  };

  // Log in the user with the given username and password
  const logIn = async (username, password) => {
    const { status, token, user } = await apiPost('/login', { username, password });
    if (status === 200) {
      localStorage.setItem(TOKEN_KEY, token);
      setToken(token);
      setUser(user);
      return true;
    }

    return false;
  };

  // Log out the user
  const logOut = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken('');
    setUser(null);
  };

  // Fetch the user when the page is loaded if we have a token
  useEffect(() => {
    if (loggedIn) {
      apiGet('/user').then(({ status, user }) => {
        if (status !== 200) throw new Error('Failed to fetch user');
        setUser(user);
      }).catch((e) => {
        console.error(e);
        logOut();
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ apiGet, apiPost, logIn, loggedIn, logOut, user }}>
      <Navbar />
     <BrowserRouter> 
        <Routes>
            <Route path='/login' element={<LogIn/>}> </Route>
            <Route path='/signup' element={<SignUp/>}> </Route>
            
            {/* If signed in */}
            <Route path='' element={<MainNavigation />} />
            <Route path='/:school' element={<SchoolSpecificThread />} />
            <Route path='/:thread' element={<CommentList />} />


            <Route path={'/profile'} element={<UserProfile/>}></Route>
            <Route path={'/otheruser'} element={<OtherUser/>}></Route>
            
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
    }
    else {
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