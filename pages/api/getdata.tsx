import type { NextApiRequest, NextApiResponse } from "next";
import { roomdata } from "@prisma/client";
const db = require("../../config/db/db");
interface room {
  Room: string;
}

export default function test(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.query);

  if (req.query.recent == "true") {
    db.query(
      `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime DESC LIMIT 1;SELECT pir,ptime FROM roomdata WHERE pir AND Room = ('\\'${req.query.Room}\\'') IS NOT NULL ORDER BY ctime DESC LIMIT 1`,
      async function (err: any, results: any) {
        if (err) {
          console.log("여기서 오류");
          console.log(err);
          return res.status(400).json(results);
        } else {
          console.log(
            `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime DESC LIMIT 1;SELECT pir,ptime FROM roomdata WHERE pir AND Room = ('\\'${req.query.Room}\\'') IS NOT NULL ORDER BY ctime DESC LIMIT 1`
          );
          // console.log(results, "통과");
          console.log(results[1]);
          results[0][0]["ptime"] = results[1][0]["ptime"];
          results[0][0]["pir"] = results[1][0]["pir"];
          return res.status(200).json({
            results: results[0][0],
          });
        }
      }
    );
  } else {
    db.query(
      "SELECT Room FROM roomdata",
      async function (err: any, result: any) {
        if (err) {
          console.log(err);
          return res.status(400).json(result);
        } else {
          result = result.filter(function (item1: room, idx1: number) {
            return (
              result.findIndex(function (item2: room) {
                return item1.Room == item2.Room;
              }) == idx1
            );
          });
          return res.status(200).json(result);
        }
      }
    );
  }
}
