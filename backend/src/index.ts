import express from "express";
import { Pool } from "pg";

require("dotenv").config();

const app = express();

const pool = new Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      success: true,
      message: "Connection successful",
      timestamp: result.rows[0].now,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Connection failed",
    });
    console.log(err.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
