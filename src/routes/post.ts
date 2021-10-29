/**@lib */
import express, { Router, Request, Response } from "express";
import formidable from 'formidable';
import _upload from "../_upload";
/**@utils */
import { executeQuery } from "../utils/common";

const post: Router = express.Router();

post.get("/list", async (req: Request, res: Response) => {
  const { keyword } = req.query;
  const query = `
  SELECT 
    id, title, tags, category_id, thumbnail_id, to_char(created_at,'YYYY-MM-DD') as created_at, to_char(updated_at,'YYYY-MM-DD') as updated_at
  FROM 
    blog.post ${keyword && `WHERE title ilike '%${keyword}%'`};`;
  executeQuery(query, res, "manyOrNone");
});

post.get("/detail/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `
  SELECT 
    id, title, contents, tags, category_id, thumbnail_id, to_char(created_at,'YYYY-MM-DD') as created_at, to_char(updated_at,'YYYY-MM-DD') as updated_at
  FROM 
    blog.post p
  WHERE 
    p.id = ${id};`;
  executeQuery(query, res, "one");
});

post.post(
  "/create",
  async (req: Request, res: Response) => {
    const { post } = req.body;
    const { title, contents, tags } = JSON.parse(post);
    const query = `INSERT INTO blog.post
    (title, contents, tags, category_id, comment_id, thumbnail_id, created_at, updated_at)
    VALUES('${title.replace(/'/g, "''")}', '${contents.replace(/'/g, "''")}', '{ "tags" : "${tags}" }', 0, 0, 0, now(), now());`;
    executeQuery(query, res, "none");
  }
);

post.post("/thumbnail",_upload.single("img"), (req: Request, res: Response) => {
  console.log(JSON.stringify(req.body));
  console.log("file::", req.file);
  console.log("files::", req.files);


  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      
      return;
    }
    console.log(fields);
    console.log(files);
  });
  res.end();
});

export default post;
