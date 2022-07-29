const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.post("/todos", async (req, res) => {
  try {
    const { desc } = req.body;
    const newTodo = await client.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [desc]
    );
    res.json(newTodo.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await client.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (e) {
    console.error(e);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await client.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json(todo.rows[0]);
  } catch (e) {
    console.error(e);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { desc } = req.body;
    const updateTodo = await client.query(
      "UPDATE todo SET description = $1 WHERE id = $2",
      [desc, id]
    );
    res.json("Todo successfully updated.");
  } catch (e) {
    console.error(e);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await client.query("DELETE FROM todo WHERE id = $1", [
      id,
    ]);
    res.json("Todo successfully deleted.");
  } catch (e) {
    console.error(e);
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
