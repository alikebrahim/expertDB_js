import express from "express";
import sqlite3 from "sqlite3";
const app = express();
const port = 3000;

app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./experts.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Expert CRUD Operations
// Create
app.post("/experts", (req, res) => {
  const timeStamp = getLocalTimestamp();
  const {
    designation,
    name,
    institution,
    bh,
    available,
    rating,
    validator_evaluator,
    academic_employer,
    genArea,
    specArea,
    trained,
    cv,
    phone,
    email,
    published,
  } = req.body;
  const sql =
    "INSERT INTO experts (designation, name, institution, bh, available, rating, validator_evaluator, academic_employer, genArea, specArea, trained, cv, phone, email, published, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.run(
    sql,
    [
      designation,
      name,
      institution,
      bh,
      available,
      rating,
      validator_evaluator,
      academic_employer,
      genArea,
      specArea,
      trained,
      cv,
      phone,
      email,
      published,
    ],
    function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    },
  );
});

// Read
app.get("/experts/:id", (req, res) => {
  const sql = "SELECT * FROM experts WHERE id = ?";
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json(row);
  });
});

// Update
app.put("/experts/:id", (req, res) => {
  const { name, expertise } = req.body;
  const sql = "UPDATE experts SET name = ?, expertise = ? WHERE id = ?";
  db.run(sql, [name, expertise, req.params.id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Expert updated", changes: this.changes });
  });
});

// Delete
// NOTE: implement ID autoincreament reset after expert deletion
// to ensure max(ID) always refers to num of entries (experts)
app.delete("/experts/:id", (req, res) => {
  const sql = "DELETE FROM experts WHERE id = ?";
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }
    res.json({ message: "Expert deleted", changes: this.changes });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function getLocalTimestamp() {
  let now = new Date();
  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, "0");
  let day = String(now.getDate()).padStart(2, "0");
  let hour = String(now.getHours()).padStart(2, "0");
  let minute = String(now.getMinutes()).padStart(2, "0");
  let second = String(now.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

console.log(getLocalTimestamp()); // Example output: "2025-03-02 15:09:13"
