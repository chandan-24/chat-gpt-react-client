import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [taskId, setTaskId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send POST request to Flask server with prompt
      const res = await axios.post('/chat', { prompt });
      setTaskId(res.data.task_id);

      // Poll for result every 2 seconds
      const intervalId = setInterval(async () => {
        const result = await axios.get(`/result/${taskId}`);
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
    <div>
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
    </div>
  );
}

export default App;
