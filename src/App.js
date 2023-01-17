import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

const baseURL = "https://chatbot.deadlyai.com";

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [taskId, setTaskId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to Flask server with prompt
      const res = await axios.post(`${baseURL}/chat`, { prompt });
      setTaskId(res.data.task_id);

      // Poll for result every 2 seconds
      const intervalId = setInterval(async () => {
        const result = await axios.get(`${baseURL}/result/${taskId}`);
        if (result.data.data) {
          setResponse(result.data.data);
          clearInterval(intervalId);
        }
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Write Something inside promt
        </p>
        <hr></hr>
        <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div>
        {response}
      </div>
      </header>
    </div>

  );
}

export default App;
