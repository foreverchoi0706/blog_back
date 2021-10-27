import { Response } from "express";
import camelize from "camelize";
//db
import db from "../db/db";

const getMessage = (message: string, query: string): string => {
  return `
  ============================================================
  ${message}\n
  query :: ${query}
  ============================================================`;
};

export const executeQuery = (query: string, res: Response, method: string = "query"): void => {
  db[method](query)
    .then((value: any) => {
      res.status(200).json(camelize(value));
    })
    .catch((reason: Error) => {
      const errorMessage: string = getMessage(reason.message, query);
      console.error(errorMessage);
      res.status(500).send(errorMessage);
    });
};

export const chainQuery = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    db.query(query)
      .then((value: any) => {
        resolve(value);
      })
      .catch((reason: Error) => {
        const errorMessage: string = getMessage(reason.message, query);
        console.error(errorMessage);
        reject(errorMessage);
      });
  });
};
