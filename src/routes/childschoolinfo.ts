import express from "express";
import config from "../config";
import axios, { AxiosInstance, AxiosResponse } from "axios";

const childschoolinfo = express.Router();

const baseURL = "https://e-childschoolinfo.moe.go.kr/api/notice";

const key = "8642a281009d4d2ba8f54359d63eb348";

const instance: AxiosInstance = axios.create({
  baseURL,
  params: {
    key: config.api.key,
  },
});

childschoolinfo.get(
  "/basicInfo",
  (req: express.Request, res: express.Response) => {
    console.log("basicInfo");
    instance
      .get("basicInfo.do", {
        params: {
          sidoCode: req.query.sidoCode,
          sggCode: req.query.sggCode,
        },
      })
      .then(({ data }: AxiosResponse<any>) => res.header(200).json(data))
      .catch((error: Error) => res.header(500).json(error));
  }
);

export default childschoolinfo;