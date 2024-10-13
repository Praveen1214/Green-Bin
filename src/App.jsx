// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css"; 
import ImportedSideMenu from "./components/common/SideMenu";
import NavBar from "./components/common/NavBar";
import DashBoard from "./components/DashBoard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/Signup";
import Managers from "./components/Managers";
import Request from "./components/Request";
import Shedule from "./components/Shedule";



function MainLayout({ setIsAuthenticated }) {
  return (
    <div className="App w-screen h-screen overflow-x-hidden">
      <div className="flex flex-1 justify-start items-start bg-[#f5faff]">
        <div className="fixed">
          <ImportedSideMenu />
        </div>
        <div className="flex-1 h-full overflow-x-hidden overflow-y-auto ml-[270px] w-[calc(100%-271px)]">
          <NavBar setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/managers" element={<Managers />} />
            <Route path="/factoryrequests" element={<Request />} />
            <Route path="/garbageschedule" element={<Shedule />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("currentUser")
  );

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem("currentUser");
      setIsAuthenticated(!!user);
    };

    window.addEventListener('storage', checkAuth);
    checkAuth();

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<MainLayout setIsAuthenticated={setIsAuthenticated} />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;