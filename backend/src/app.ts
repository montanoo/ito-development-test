import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.options("*", cors());
app.use(express.json());

export default app;
