import type { NextApiRequest, NextApiResponse } from "next";
import { roomdata } from "@prisma/client";
const db = require("../../config/db/db");
interface room {
  Room: string;
}

export default function test(req: NextApiRequest, res: NextApiResponse) {
  db.query("SELECT Room FROM roomdata", async function (err: any, result: any) {
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
  });
}
