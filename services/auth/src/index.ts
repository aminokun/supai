import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import "dotenv/config";
import express from "express";
import { auth } from "./auth.js";

const PORT = process.env.PORT || 8080;

const app = express();

app.use(
  cors({
    origin: `${process.env.TRUSTED_ORIGINS}`,
    credentials: true,
  })
);
app.all("/api/auth/{*any}", toNodeHandler(auth));

app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("Yo");
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
