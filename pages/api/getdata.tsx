import type { NextApiRequest, NextApiResponse } from "next";
const conn = require("../../config/db/db");
const mysql = require("mysql2");
interface room {
  Room: string;
}
interface roomdata {
  id: number;
  Room: string;
  ctime: number;
  co2: number;
  htime: number;
  humidity: number;
  ltime: number;
  light: number;
  ptime: number;
  pir: number;
  ttime: number;
  temperature: number;
}
interface response {
  max: roomdata[];
  min: roomdata[];
}
export default function test(req: NextApiRequest, res: NextApiResponse) {
  let db;
  db = mysql.createConnection(conn);
  if (!req.query.Room) {
    return;
  }
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
      `SELECT * FROM roomdata where Room = ('\\'${req.query.Room}\\'') ORDER BY ctime ASC LIMIT 10000;`,
      async function (err: any, results: roomdata[]) {
        if (err) {
          console.log(err);
          return res.status(400).json(results);
        }
        console.log(results[0].co2);
        let count = 0;
        let maxlist: roomdata[] = [];
        let minlist: roomdata[] = [];

        let maxco2 = [0, 0];
        let maxhumidity = [0, 0];
        let maxlight = [0, 0];
        let maxpir = [0, 0];
        let maxtemperature = [0, 0];
        let minco2 = [0, 0];
        let minhumidity = [0, 0];
        let minlight = [0, 0];
        let minpir = [0, 0];
        let mintemperature = [0, 0];
        results.forEach((result, idx) => {
          if (count === 0) {
            maxco2 = [result.co2, result.ctime];
            maxhumidity = [result.humidity, result.htime];
            maxlight = [result.light, result.ltime];
            maxpir = [result.pir, result.ptime];
            maxtemperature = [result.temperature, result.ttime];
            minco2 = [result.co2, result.ctime];
            minhumidity = [result.humidity, result.htime];
            minlight = [result.light, result.ltime];
            minpir = [result.pir, result.ptime];
            mintemperature = [result.temperature, result.ttime];
          }
          if (result.co2 > maxco2[0]) {
            maxco2[0] = result.co2;
            maxco2[1] = result.ctime;
          }
          if (result.co2 < minco2[0]) {
            minco2[0] = result.co2;
            minco2[1] = result.ctime;
          }
          if (result.humidity > maxhumidity[0]) {
            maxhumidity[0] = result.humidity;
            maxhumidity[1] = result.htime;
          }
          if (result.humidity < minhumidity[0]) {
            minhumidity[0] = result.humidity;
            minhumidity[1] = result.htime;
          }

          if (result.light > maxlight[0]) {
            maxlight[0] = result.light;
            maxlight[1] = result.ltime;
          }
          if (result.light < minlight[0]) {
            minlight[0] = result.light;
            minlight[1] = result.ltime;
          }

          if (result.pir > maxpir[0]) {
            maxpir[0] = result.pir;
            maxpir[1] = result.ptime;
          }
          if (result.pir < minpir[0]) {
            minpir[0] = result.pir;
            minpir[1] = result.ptime;
          }

          if (result.temperature > maxtemperature[0]) {
            maxtemperature[0] = result.temperature;
            maxtemperature[1] = result.ttime;
          }
          if (result.temperature < mintemperature[0]) {
            mintemperature[0] = result.temperature;
            mintemperature[1] = result.ttime;
          }

          if (count === 179 || idx == results.length - 1) {
            count = 0;
            maxlist.push({
              Room: results[0].Room,
              id: results[0].id,
              co2: maxco2[0],
              ctime: maxco2[1],
              humidity: maxhumidity[0],
              htime: maxhumidity[1],
              light: maxlight[0],
              ltime: maxlight[1],
              pir: maxpir[0],
              ptime: maxpir[1],
              temperature: maxtemperature[0],
              ttime: maxtemperature[1],
            });
            minlist.push({
              Room: results[0].Room,
              id: results[0].id,
              co2: minco2[0],
              ctime: minco2[1],
              humidity: minhumidity[0],
              htime: minhumidity[1],
              light: minlight[0],
              ltime: minlight[1],
              pir: minpir[0],
              ptime: minpir[1],
              temperature: mintemperature[0],
              ttime: mintemperature[1],
            });
          } else {
            count = count + 1;
          }
        });
        return res.status(200).json({ max: maxlist, min: minlist });
      }
    );
  }
  db.end();
}
