import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.route";
import nurseRouter from "./routes/nurse.route";
import { routeErrorHandler, unhandledErrorHandler } from "./middleware/exception";

require('dotenv').config();

const app: Application = express();
console.log(process.env.PORT);
const PORT = process.env.PORT || 7000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/auth", authRouter);
app.use("/nurses", nurseRouter);

app.use(routeErrorHandler);

app.use(unhandledErrorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
