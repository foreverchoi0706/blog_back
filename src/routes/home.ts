import express from "express";

const home = express.Router();

home.get("/", async (_, res: express.Response) => {
  res.header(200).json("welcome server");
});

export default home;
