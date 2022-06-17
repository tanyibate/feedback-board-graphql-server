import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(morgan("short"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
