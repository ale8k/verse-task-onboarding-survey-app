import dotenv from "dotenv";
import express, { Application } from "express";
import cors from "cors";
import questionRoutes from "./routes/questionRoutes";
dotenv.config();

const PORT: Number | String = process.env.PORT || 3000;
const app: Application = express();

app.use(cors());
app.use("/", questionRoutes);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
