import logo from "./logo.svg";
import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import ChatUi from "./components/ChatUi";

const baseURL = "https://chatbot.deadlyai.com";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [taskId, setTaskId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send POST request to Flask server with prompt
      const res = await axios.post(`${baseURL}/chat`, { prompt });
      setTaskId(res.data.task_id);

      if (res.data.task_id) {
        const result = await axios.get(`${baseURL}/result/${taskId}`);
        setResponse(result.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <main>
        <ChatUi />
      </main>
    </div>
  );
}

export default App;
