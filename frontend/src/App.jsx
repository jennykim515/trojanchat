import './App.css';
import React from 'react';
import { createContext, useState } from "react"
import { BrowserRouter, MemoryRouter as Router, Route, Routes} from 'react-router-dom';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import MainNavigation from './pages/MainNavigation'
import School
 from './components/School';
import SchoolSpecificThread from './pages/SchoolSpecificThread';
export const AppContext = createContext(null)

function App() {
   const [user, setUser] = React.useState('');
  // const [user, setUser] = useState({
  //   name: "Trojan",
  //   major: "Computer Science",
  //   username: "tjan",
  //   grad: "2024",
  //   password: "password"
  // })

  return (

    <>
    <AppContext.Provider value={{ user, setUser }}>
     <BrowserRouter> 
        <Routes>
            <Route path='/login' element={<LogIn/>}> </Route>
            <Route path='/signup' element={<SignUp/>}> </Route>
            
            {/* If signed in */}
            <Route path='' element={<MainNavigation />} />
            <Route path='/:school' element={<SchoolSpecificThread />} />
            
        </Routes>
     </BrowserRouter> 
    </AppContext.Provider>
    </>
  );
}

export default App;
