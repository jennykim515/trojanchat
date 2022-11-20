import './App.css';
import { createContext, useState } from "react"
import UserThreads from './pages/ChatThreads';
import MainNavigation from './pages/MainNavigation';

export const AppContext = createContext(null)

function App() {
  const [user, setUser] = useState({
    name: "Trojan",
    major: "Computer Science",
    username: "tjan",
    grad: "2024",
    password: "password"
  })

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {/* add components */}
      {/* <UserThreads /> */}
      <MainNavigation />
    </AppContext.Provider>
  );
}

export default App;
