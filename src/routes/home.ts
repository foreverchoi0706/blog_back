import express from "express";
import multer from "multer";
//db
import db from "../db/db";
const home = express.Router();

const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (_, file, cb) {
    cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 10000,
  },
});

home.get("/", async (_, res: express.Response) => {
  res.header(200).json("welcome");
});

home.post(
  "/send",
  upload.array("images"),
  async (req: express.Request, res: express.Response) => {
    console.log(req.files);
    res.header(200).json("scuccess");
  }
);

export default home;
