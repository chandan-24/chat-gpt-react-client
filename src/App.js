import "./App.css";
import React from "react";
import ChatUi from "./components/ChatUi";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      <main className="relative">
        <Navbar />
        <ChatUi />
          {/* <Profile /> */}

      </main>
    </div>
  );
}

export default App;
