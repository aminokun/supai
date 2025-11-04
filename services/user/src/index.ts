import cors from "cors";
import "dotenv/config";
import express from "express";

const PORT = process.env.PORT || 3002;

const app = express();

app.use(
  cors({
    origin: `${process.env.TRUSTED_ORIGINS}`,
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req: any, res: any) => {
  res.send("User Service");
});

app.get("/health", (req: any, res: any) => {
  res.json({ status: "ok", service: "user-service" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port:${PORT}`);
});
