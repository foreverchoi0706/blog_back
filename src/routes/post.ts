/**@lib */
import { Router, Request, Response } from "express";
import _upload from "../_upload";
import fs from "fs";
import path from "path";
/**@utils */
import { chainQuery, executeQuery } from "../utils/common";

const router: Router = Router();

router.get("/list", async (req: Request, res: Response) => {
  const { keyword } = req.query;
  const query = `
  SELECT p.id, title, tags, category_id, thumbnail_id, to_char(created_at,'YYYY-MM-DD') AS created_at, to_char(updated_at,'YYYY-MM-DD') AS updaÏted_at, t.value FROM blog.post p INNER JOIN blog.thumbnail t ON p.thumbnail_id = t.id ${keyword && `WHERE title ilike '%${keyword}%'`};`;
  executeQuery(query, res, "manyOrNone");
});

router.get("/detail/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const query = `
  SELECT p.id, title, contents, tags, category_id, thumbnail_id, to_char(created_at,'YYYY-MM-DD') AS created_at, to_char(updated_at,'YYYY-MM-DD') AS updaÏted_at, t.value FROM blog.post p INNER JOIN blog.thumbnail t ON p.thumbnail_id = t.id WHERE p.id = ${id};`;
  executeQuery(query, res, "one");
});

router.post("/", async (req: Request, res: Response) => {
  const { title, contents, tags, thumbnailId } = req.body;
  const query = `INSERT INTO blog.post (title, contents, tags, category_id, comment_id, thumbnail_id, created_at, updated_at) VALUES('${title.replace(/'/g, "''")}', '${contents.replace(/'/g, "''")}', '{ "tags" : "${tags}" }', 0, 0, ${thumbnailId}, now(), now());`;
  executeQuery(query, res, "none");
});

router.get("/thumbnail", (_, res: Response) => {
  const query = `SELECT id, value FROM blog.thumbnail;`;
  executeQuery(query, res, "manyOrNone");
});

router.post("/thumbnail", _upload.single("img"), (req: Request, res: Response) => {
  const query = `INSERT INTO blog.thumbnail (value) VALUES('${req.file.filename}');`;
  executeQuery(query, res, "none");
});

router.delete("/thumbnail", (req: Request, res: Response) => {
  const { thumbnailId } = req.query;
  const query = `SELECT value FROM blog.thumbnail t WHERE t.id =${thumbnailId};`
  chainQuery(query, "one").then(result => {
    const { value } = result;
    const query = `DELETE FROM blog.thumbnail WHERE id=${thumbnailId};`
    chainQuery(query, "none").then(() => {
      fs.unlink(path.join("public/uploads/", value), function (err) {
        if (err) throw err;
        res.status(200).end();
      });
    });
  });
});

export default router;
