import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";

import DbConn from "./models/dbconn";

/**
 * Allows us to rely on .env file as cloud host may
 */
dotenv.config();

const dbConn = new DbConn();

dbConn.fetchAllQuestionsByCategory("Diet").then(console.log);

const PORT: Number | String = process.env.PORT || 3000;

const app: Application = express();

app.get("/", async (req: Request<ParamsDictionary>, res: Response<String>) => {

});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
