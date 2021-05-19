import express, { Router } from "express";
import multer from "multer";
//db
import db from "../db/db";

const user: Router = express.Router();

const storage: multer.StorageEngine = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "public/uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const userMulter = multer({
  storage,
});

user.get("/", async (req: express.Request, res: express.Response) => {
  const id = req.query.id;

  const query = `SELECT * 
  FROM uriai.user
  WHERE id = ${id}`;

  const result = await db.one(query);
  res.header(200).json(result);
});

user.patch(
  "/profile",
  userMulter.single("file"),
  async (req: express.Request, res: express.Response) => {
    const { id } = req.body;

    const query = `UPDATE uriai.user 
    SET "profilePath"='${req.file.originalname}',"updateDate" = now()
    WHERE id = ${id}`;

    const result = await db.query(query);

    res.header(200).json({
      success: true,
      result,
    });
  }
);

export default user;
