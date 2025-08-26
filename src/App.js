import { useState } from "react";
import "./App.css";
import { parseChuck } from "./utils/utils.js";
import { UsersList } from "./UsersList.js";

function App() {
  const [users, setUsers] = useState([]);

  async function fetchStream() {
    const response = await fetch("http://localhost:4000/users");

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let partialUsers = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      const user = parseChuck(chunk);
      if (user) {
        partialUsers.push(user);
        setUsers((prevUsers) => [...prevUsers, user]);
      }
    }
  }

  return (
    <div className="App">
      <button onClick={fetchStream}>Load users</button>
      <UsersList users={users} />
    </div>
  );
}

export default App;
