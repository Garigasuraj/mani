const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files like HTML, CSS, JS

const db = mysql.createConnection({
    host: 'database-1.crkcuyiamz5g.us-east-1.rds.amazonaws.com',    // Replace with your MySQL server hostname
    user: 'admin',          // Replace with your MySQL username
    password: 'GsurManikanta17aj@17',          // Replace with your MySQL password
    database: 'database-1' 
})

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Routes
// Get all todos
app.get("/api/todos", (req, res) => {
  const query = "SELECT * FROM todos";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  const query = "INSERT INTO todos (task) VALUES (?)";
  db.query(query, [task], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, task });
  });
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM todos WHERE id = ?";
  db.query(query, [id], err => {
    if (err) throw err;
    res.sendStatus(204);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
