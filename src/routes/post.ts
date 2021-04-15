import express from "express";
//db
import db from "../db/db";

const post = express.Router();

post.get("/", (req: express.Request, res: express.Response) => {
  db.one("SELECT * FROM public.post").then((result:any) => console.log(result));
  res.header(200).json("post");
});

export default post;
