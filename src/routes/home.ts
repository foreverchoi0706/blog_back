import express from "express";

//db
import db from "../db/db";
const home = express.Router();

home.get("/", async (_, res: express.Response) => {
  const result = await db.one("SELECT * FROM TEST");
  console.dir(result);

  res.header(200).json("welcome");
});

export default home;
