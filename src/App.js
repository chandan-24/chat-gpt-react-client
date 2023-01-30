import "./App.css";
import React from "react";
import ChatUi from "./components/ChatUi";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";

function App() {
  return (
    <div className="App">
      <main className="relative">
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatUi />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </main>
    </div>
  );
}

export default App;
