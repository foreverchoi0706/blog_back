/**@lib */
import express, { Router, Request, Response } from "express";
import multer from "multer";
import db from "../db/db";
/**@utils */
import { executeQuery } from "../utils/common";

const post: Router = express.Router();

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload: multer.Multer = multer({
  storage: storage,
  limits: {
    fieldSize: 10000,
  },
});

post.get("/list", async (_, res: Response) => {
  const query = `
  SELECT 
    id, title, tags, category_id, thumbnail_id, to_char(created_at,'YYYY-MM-DD') as created_at, to_char(updated_at,'YYYY-MM-DD') as updated_at
  FROM 
    blog.post;`;
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
    VALUES('${title}', '${contents.replace("'", "\'")}', '{ "tags" : "${tags}" }', 0, 0, 0, now(), now());`;
    executeQuery(query, res, "none");
  }
);

post.post("/thumbnail", upload.single("thumbnail"), async (req: Request, res: Response) => {
  console.log("file::", req.file);
});

export default post;
