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
  db.query("SELECT Room FROM roomdata", async function (err: any, result: any) {
    if (err) {
      console.log(err);
      return res.status(400);
    } else {
      result = result.filter(function (item1: room, idx1: number) {
        return (
          result.findIndex(function (item2: room) {
            return item1.Room == item2.Room;
          }) == idx1
        );
      });
      result = result.map((val: { Room: string }) => {
        return val["Room"].replaceAll("'", "");
      });
      return res.status(200).json(result);
    }
  });

  db.end();
}
