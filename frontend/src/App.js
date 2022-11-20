import './App.css';
import React, { createContext, useState } from "react"
import UserThreads from './pages/ChatThreads';
import UserProfile2 from "./pages/user/UserProfile2";
import UserProfile from "./pages/user/UserProfile";

export const AppContext = createContext(null)

function App() {
  const [user, setUser] = useState({
    name: "Trojan",
    major: "Computer Science",
    username: "tjan",
    grad: "2024",
    password: "password"
  })

//need to add react-router
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {/* add components */}
      <>
        <UserThreads/>
        <UserProfile/>
      </>
    </AppContext.Provider>
  );
}

export default App;


