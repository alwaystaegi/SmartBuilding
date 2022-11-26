import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { REPL_MODE_SLOPPY } from "repl";
import Sidebar from "../component/sidebar";
import { ProgressBar } from "react-bootstrap";
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
  results: roomdata;
}
export default function Home() {
  const [collapse, setCollapse] = useState("collapse");
  const [roomlist, setRoomlist] = useState<string[]>([]);
  const [roomdatas, setRoomdatas] = useState<roomdata[]>([]);

  useEffect(() => {
    fetch("/api/getRoomlist", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json: string[]) => {
        setRoomlist(json);
        console.log(roomlist);
      });
  }, []);

  const checkco2 = (co2: number) => {
    if (co2 < 500) return "info";
    else if (co2 < 1000) return "success";
    else if (co2 < 1500) return "warning";
    else return "danger";
  };
  const checkhumidity = (humidity: number, temperature: number) => {
    if (temperature < 18) {
      if (humidity < 61) return "warning";
      else if (humidity < 81) return "info";
      else return "warning";
    } else if (temperature < 21) {
      if (humidity < 51) return "warning";
      else if (humidity < 71) return "info";
      else return "warning";
    } else if (temperature < 24) {
      if (humidity < 41) return "warning";
      else if (humidity < 61) return "info";
      else return "warning";
    } else {
      if (humidity < 31) return "warning";
      else if (humidity < 51) return "info";
      else return "warning";
    }
  };
  useEffect(() => {
    console.log(roomdatas.length);

    if (roomdatas.length === 0) {
      roomlist.map((room) => {
        getRoomdata(room);
      });
    } else {
      console.log(roomdatas);
    }
  }, [roomlist]);

  const getDashbord = (room: string, index: number) => {
    return (
      <div key={room} className="col-xl-10 col-lg-2 col-md-2 mb-2 RoomCard">
        <div className="card border-left-primary shadow h-100 py-2 ">
          <div className="card-body ">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2 ">
                <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">
                  <Link href={`/Roomlist/${room}`}> {room}</Link>
                </div>
                <div>
                  {roomdatas[index]?.co2 ? (
                    <>
                      <div>
                        이산화탄소 농도{" "}
                        <span className="font-weight-bold">
                          {roomdatas[index].co2}
                        </span>
                        ppm{" "}
                      </div>
                      <ProgressBar
                        now={roomdatas[index].co2 / 20}
                        variant={checkco2(roomdatas[index].co2)}
                      ></ProgressBar>
                      <div className="d-flex justify-content-between text-xs">
                        <div>쾌적</div>
                        <div>적정</div>
                        <div>주의</div>
                        <div>위험</div>
                        <div></div>
                      </div>
                    </>
                  ) : null}
                  {roomdatas[index]?.humidity ? (
                    <>
                      <div>습도{roomdatas[index].humidity}</div>
                      <ProgressBar
                        now={roomdatas[index].humidity}
                        variant={checkhumidity(
                          roomdatas[index].humidity,
                          roomdatas[index].temperature
                        )}
                      ></ProgressBar>
                      <div className="d-flex justify-content-between text-xs">
                        <div>건조</div>
                        <div>10%</div>
                        <div>20%</div>
                        <div>
                          30%
                          {roomdatas[index].temperature >= 24 ? "적정" : null}
                        </div>
                        <div>
                          40%
                          {roomdatas[index].temperature < 24 &&
                          roomdatas[index].temperature >= 21
                            ? "적정"
                            : null}
                        </div>
                        <div>
                          50%
                          {roomdatas[index].temperature < 21 &&
                          roomdatas[index].temperature >= 18
                            ? "적정"
                            : null}
                          {roomdatas[index].temperature >= 24 ? "습함" : null}
                        </div>
                        <div>
                          60%
                          {roomdatas[index].temperature < 18 ? "적정" : null}
                          {roomdatas[index].temperature < 24 &&
                          roomdatas[index].temperature >= 21
                            ? "습함"
                            : null}
                        </div>
                        <div>
                          70%
                          {roomdatas[index].temperature < 21 &&
                          roomdatas[index].temperature >= 18
                            ? "습함"
                            : null}
                        </div>
                        <div>
                          80%{" "}
                          {roomdatas[index].temperature < 18 ? "습함" : null}
                        </div>
                        <div>90%</div>
                        <div>100%</div>
                      </div>
                    </>
                  ) : null}
                  {roomdatas[index]?.pir ? (
                    <div>모션센서{roomdatas[index].pir}</div>
                  ) : null}
                  {roomdatas[index]?.temperature ? (
                    <div>온도{roomdatas[index].temperature}</div>
                  ) : null}
                  {roomdatas[index]?.light ? (
                    <div>조명{roomdatas[index].light}</div>
                  ) : null}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const getRoomdata = (room: string) => {
    fetch(`/api/getdata?Room=${room}&recent=true`, { method: "POST" })
      .then((res) => res.json())
      .then((json: response) => {
        setRoomdatas((recentdata) => {
          return [...recentdata, json.results];
        });
      });
  };

  return (
    <div>
      <Sidebar>
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                <div className="input-group"></div>
              </form>
            </nav>
            <div className="container-fluid">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">실시간 호실 현황</h1>
              </div>

              <div className="row">
                {roomlist?.map((val, idx) => {
                  console.log(val);
                  return getDashbord(val, idx);
                })}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
