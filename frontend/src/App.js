import './App.css';
import React, { createContext, useState } from "react"
import UserThreads from './pages/ChatThreads';
import UserProfile from "./pages/user/UserProfile";
import OtherUserProfile from "./pages/user/OtherUser";
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
        <OtherUserProfile/>
      </>
    </AppContext.Provider>
  );
}

export default App;


