const express = require("express");
const cors = require("cors");
const users = require("./users.json");
const app = express();
const PORT = 4000;

// Allow frontend (React on localhost:3000)
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Streaming route
app.get("/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Transfer-Encoding", "chunked");

  // Start JSON array
  res.write("[");

  let i = 0;
  const interval = setInterval(() => {
    if (i < users.length) {
      const chunk = JSON.stringify(users[i]);
      // Add comma between objects, except before the first one
      res.write((i > 0 ? "," : "") + chunk);
      i++;
    } else {
      clearInterval(interval);
      // End JSON array and response
      res.write("]");
      res.end();
    }
  }, 1000); // send one user every second
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
