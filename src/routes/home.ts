import express from "express";
import axios from "axios";

const home = express.Router();

home.get("/", async (_, res: express.Response) => {
  res.header(200).json("welcome server");
});

home.get("/getNickname", async (_, res: express.Response) => {
  const { data } = await axios.get("https://nickname.hwanmoo.kr/?format=text&count=1");
  res.header(200).json({
    nickname: data
  });
});

export default home;
