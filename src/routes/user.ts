import { Router, Request, Response, NextFunction } from "express";
import multer, { Multer, StorageEngine } from "multer";
import bcrypt from "bcrypt";
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
  const hash: string = bcrypt.hashSync(String(pw), 10);
  req.body.pw = hash;
  const query = `select test.ins_user('${JSON.stringify(req.body)}')`;
  executeQuery(query, res);
});

//로그인(인증)
user.post("/signIn", (req: Request, res: Response, next: NextFunction) => {
  const { id, pw } = req.body;
  const query = `select pw from test.users u where u.id = '${id}'`;
  chainQuery(query, res).then((value: any) => {
    const compare = bcrypt.compareSync(String(pw), value[0].pw);
    if (compare) {
      next();
    } else {
      res.status(200).send("비번 틀림");
    }
  });
});

//id중복체크
user.get("duplicated", (req: Request, res: Response, next: NextFunction) => {
  const query = `select pw from test.users u where u.id = '${req.query.id}'`;
  executeQuery(query, res);
});

//로그인(jwt)
user.post("/signIn", (req: Request, res: Response) => {
  console.log(req.body);
  res.send("로그인성공");
});

user.patch(
  "/profile",
  userMulter.single("file"),
  (req: Request, res: Response) => {}
);

export default user;
