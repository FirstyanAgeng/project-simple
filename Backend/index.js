const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const port = 3001;

app.use(cors());
app.use(express.json());

const database = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simple_db",
  port: 3306,
});

database.connect((err) => {
  if (err) throw error;
  console.log("database connected");
});

// get data
app.get("/api/products", (req, res) => {
  database.query("SELECT * FROM simple_item", (err, rows) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "getting produk item",
      data: rows,
    });
  });
});

// add data
app.post("/api/products", (req, res) => {
  const { nama_produk, stock } = req.body;

  const query = "INSERT INTO simple_item (nama_produk, stock) VALUES (?, ?)";
  database.query(query, [nama_produk, stock], (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Product added successfully",
      data: result,
    });
  });
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const { nama_produk, stock } = req.body;

  const query =
    "UPDATE simple_item SET nama_produk = ?, stock = ? WHERE id = ?";
  database.query(query, [nama_produk, stock, id], (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Product updated successfully",
      data: result,
    });
  });
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM simple_item WHERE id = ?";
  database.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  });
});

app.listen(port, () => {
  console.log("server running on port : ", port);
});
