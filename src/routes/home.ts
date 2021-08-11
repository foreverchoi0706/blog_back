import { Router, Response, NextFunction } from "express";
import axios from "axios";
const home = Router();

home.get("/", async (_, __, next: NextFunction) => {
  console.log("test1");
  next();
});

home.get("/", async (_, res: Response) => {
  console.log("test2");
  res.status(200).send("next end");
});

home.get("/getNickname", async (_, res: Response) => {
  const { data } = await axios.get(
    "https://nickname.hwanmoo.kr/?format=text&count=1"
  );
  res.status(200).json({
    nickname: data,
  });
});

export default home;
