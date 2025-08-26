import { useState } from "react";
import "./App.css";
import { parseChuck } from "./utils/utils.js";
import { UsersList } from "./UsersList.js";

function App() {
  const [users, setUsers] = useState([]);
  const [abortController, setAbortController] = useState(null);

  async function fetchStream() {
    try {
      if (abortController) abortController.abort();

      const newAbortController = new AbortController();
      setAbortController(newAbortController);

      const response = await fetch("http://localhost:4000/users", {
        signal: newAbortController.signal,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        const user = parseChuck(chunk);
        if (user) setUsers((prevUsers) => [...prevUsers, user]);
      }
    } catch (err) {
      if (err.name === "AbortError") {
        setUsers([]);
      } else {
        console.error("❌ Failed to load users:", err);
      }
    }
  }

  return (
    <div className="App">
      <button onClick={fetchStream} className="btn-load">
        Load users
      </button>
      <UsersList users={users} />
    </div>
  );
}

export default App;
