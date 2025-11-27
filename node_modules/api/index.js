import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // loads .env from root if configured properly

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "mailminded-api" });
});

app.listen(PORT, () => {
  console.log(`Mailminded API listening on port ${PORT}`);
});
