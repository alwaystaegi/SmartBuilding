import type { NextApiRequest, NextApiResponse } from "next";
import { roomdata } from "@prisma/client";
const conn = require("../../config/db/db");
const mysql = require("mysql2");
interface room {
  Room: string;
}

export default function test(req: NextApiRequest, res: NextApiResponse) {
  let db;
  db = mysql.createConnection(conn);

  if (req.query.recent == "true") {
    db.query(
      `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime DESC LIMIT 1;SELECT pir,ptime FROM roomdata WHERE Room = ('\\'${req.query.Room}\\'') AND pir IS NOT NULL ORDER BY ctime DESC LIMIT 1`,
      async function (err: any, results: any) {
        if (err) {
          console.log("여기서 오류");
          console.log(err);
          return res.status(400).json(results);
        } else {
          console.log(
            `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime DESC LIMIT 1;SELECT pir,ptime FROM roomdata WHERE Room = ('\\'${req.query.Room}\\'') AND pir IS NOT NULL ORDER BY ctime DESC LIMIT 1`
          );
          console.log("test", results[1][0]);
          results[0][0]["ptime"] = results[1][0]["ptime"];
          results[0][0]["pir"] = results[1][0]["pir"];
          console.log(results[0][0]);
          return res.status(200).json({
            results: results[0][0],
          });
        }
      }
    );
  } else {
    db.query(
      `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime ASC LIMIT 1000;`,
      async function (err: any, result: any) {
        if (err) {
          console.log(err);
          return res.status(400).json(result);
        }
        return res.status(200).json(result);
      }
    );
  }
  db.end();
}
