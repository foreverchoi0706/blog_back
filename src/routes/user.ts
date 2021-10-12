import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer, StorageEngine } from "multer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
//utils
import { executeQuery, chainQuery } from "../utils/common";

const user: Router = Router();

const storage: StorageEngine = multer.diskStorage({
  destination: function (_, __, callback) {
    callback(null, "public/uploads/"); // callback 콜백함수를 통해 전송된 파일 저장 디렉토리 설정
  },
  filename: function (_, file, callback) {
    callback(null, file.originalname); // callback 콜백함수를 통해 전송된 파일 이름 설정
  },
});

const userMulter: Multer = multer({
  storage,
});

user.get("/", (_, res: Response) => {
  const query = `select * from test.users u`;
  executeQuery(query, res);
});

//회원가입
user.post("/signUp", (req: Request, res: Response) => {
  const { pw } = req.body;
  const hash: string = bcryptjs.hashSync(String(pw), 10);
  req.body.pw = hash;
  const query = `select test.ins_user('${JSON.stringify(req.body)}')`;
  executeQuery(query, res);
});

//로그인(인증)
user.post(
  "/signIn",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, pw } = req.body;

    const query = `select pw from test.users u where u.id = '${id}'`;

    const result = await chainQuery(query);

    if (!result.length) res.status(200).end("ID 틀림");

    const compare = bcryptjs.compareSync(String(pw), result[0].pw);

    compare ? next() : res.status(200).send("PW 틀림");
  }
);

//로그인(jwt)
user.post("/signIn", (req: Request, res: Response) => {
  console.log(req.body);
  const token = jwt.sign(String(req.body.id), "key");
  res.cookie("token", token).send("로그인 성공");
});

//id중복체크
user.get("/duplicated", (req: Request, res: Response) => {
  const query = `select id from test.users u where u.id = '${req.query.id}'`;
  executeQuery(query, res);
});

user.patch(
  "/profile",
  userMulter.single("file"),
  (req: Request, res: Response) => {}
);

export default user;
