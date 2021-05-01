import express from "express";
import multer from "multer";
//db
import db from "../db/db";

const post = express.Router();

const LINE =
  "--------------------------------------------------------------------------------------------------------------";

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

post.get("/tagList", async (req: express.Request, res: express.Response) => {
  const { area } = req.query;
  const query = `SELECT tag FROM public.post WHERE area='${area}' GROUP BY tag ORDER BY tag;`;
  const result = await db
    .any(query)
    .then((result: any) => result)
    .catch((error: any) => console.log(error));
  console.log(query);
  console.log(result);
  console.log(LINE);
  res.header(200).json(result);
});

post.get("/postList", async (req: express.Request, res: express.Response) => {
  const { tag } = req.query;
  const query = `SELECT id,title FROM public.post WHERE tag='${tag}' ORDER BY title;`;
  const result = await db
    .any(query)
    .then((result: any) => result)
    .catch((error: any) => console.log(error));
  console.log(query);
  console.log(result);
  console.log(LINE);
  res.header(200).json(result);
});

post.get("/read", async (req: express.Request, res: express.Response) => {
  const { id } = req.query;
  const query = `SELECT * FROM public.post WHERE id=${id};`;
  const result = await db
    .one(query)
    .then((result: any) => result)
    .catch((error : Error) => console.log(error));
  console.log(result);
  console.log(LINE);
  res.header(200).json(result);
});

post.post(
  "/create",
  upload.array("images"),
  async (req: express.Request, res: express.Response) => {
    console.log(LINE);
    const { title, area, tag, content } = req.body;
    const query = `INSERT INTO public.post (id,title,area,tag,content) VALUES (DEFAULT,'${title}','${area}','${tag}','${content}');`;
    const result = await db
      .one(query)
      .then((result: any) => result)
      .catch((error: any) => console.log(error));
    console.log(result);
    console.log(LINE);
    res.header(200).json("post");
  }
);

post.put(
  "/modify",
  upload.array("images"),
  (req: express.Request, res: express.Response) => {
    res.header(200).json("modify");
  }
);

post.delete("/delete", (req: express.Request, res: express.Response) => {
  res.header(200).json("delete");
});

export default post;
