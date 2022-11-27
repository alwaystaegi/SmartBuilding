import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { REPL_MODE_SLOPPY } from "repl";
import Sidebar from "../component/sidebar";
import { ProgressBar } from "react-bootstrap";
import { useRouter } from "next/router";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
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
  const [timerID, setTimerID] = useState<NodeJS.Timer>();
  const router = useRouter();
  useEffect(() => {
    fetch("/api/getRoomlist", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json: string[]) => {
        setRoomlist(json);
      });
    setInterval(() => {
      fetch("/api/getRoomlist", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((json: string[]) => {
          setRoomlist(json);
        });
      setRoomdatas([]);
      roomlist.forEach((room) => {
        getRoomdata(room);
      });
    }, 5000);
  }, []);

  const checkco2 = (co2: number) => {
    if (co2 < 500) {
      return "info";
    } else if (co2 < 1000) return "success";
    else if (co2 < 1500) {
      return "warning";
    } else {
      return "danger";
    }
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
    setRoomdatas([]);
    roomlist.forEach((room) => {
      getRoomdata(room);
    });
  }, [roomlist]);

  const getDashBoard = (room: string) => {
    let index = 0;
    roomdatas.forEach((val, idx) => {
      if (val.Room === `'${room}'`) {
        index = idx;
      }
    });
    return (
      <div key={room} className="col-xl-10 col-lg-2 col-md-2 mb-2 RoomCard">
        <div className="card border-left-primary shadow h-100 py-2 ">
          <div className="card-body ">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2 ">
                <div className="row justify-content-between text-xl font-weight-bold text-primary text-uppercase mb-1">
                  <Link href={`/Roomlist/${room}`}> {room}</Link>
                  <div className="row">
                    <div className="text-body">현재 온도</div>
                    <div className="mx-2 text-dark">
                      {roomdatas[index]?.temperature}℃
                    </div>
                    <div className="text-body">현재 인원</div>
                    <div className="mx-2 text-dark">
                      {roomdatas[index]?.pir}명
                    </div>
                    <div className="text-body">방 밝기</div>
                    <div className="mx-2 text-dark">
                      {roomdatas[index]?.light}
                    </div>
                  </div>
                </div>
                <div>
                  {roomdatas[index]?.co2 ? (
                    <>
                      <div className="text-lg">
                        이산화탄소 농도{" "}
                        <span
                          className={`font-weight-bold text-${checkco2(
                            roomdatas[index]?.co2
                          )}`}
                        >
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
                      <div className="text-lg">
                        습도
                        <span
                          className={`font-weight-bold text-${checkhumidity(
                            roomdatas[index].humidity,
                            roomdatas[index].temperature
                          )}`}
                        >
                          {roomdatas[index].humidity}
                        </span>
                      </div>
                      <ProgressBar
                        now={roomdatas[index].humidity}
                        variant={checkhumidity(
                          roomdatas[index].humidity,
                          roomdatas[index].temperature
                        )}
                      ></ProgressBar>
                      <div className="d-flex justify-content-between text-xs">
                        <div>건조</div>
                        <div></div>
                        <div></div>
                        <div>
                          {roomdatas[index].temperature >= 24 ? "적정" : null}
                        </div>
                        <div>
                          {roomdatas[index].temperature < 24 &&
                          roomdatas[index].temperature >= 21
                            ? "적정"
                            : null}
                        </div>
                        <div>
                          {roomdatas[index].temperature < 21 &&
                          roomdatas[index].temperature >= 18
                            ? "적정"
                            : null}
                          {roomdatas[index].temperature >= 24 ? "습함" : null}
                        </div>
                        <div>
                          {roomdatas[index].temperature < 18 ? "적정" : null}
                          {roomdatas[index].temperature < 24 &&
                          roomdatas[index].temperature >= 21
                            ? "습함"
                            : null}
                        </div>
                        <div>
                          {roomdatas[index].temperature < 21 &&
                          roomdatas[index].temperature >= 18
                            ? "습함"
                            : null}
                        </div>
                        <div>
                          {roomdatas[index].temperature < 18 ? "습함" : null}
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                    </>
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
                <div className="d-sm-flex">
                  <div>새로고침</div>
                  <div
                    className="btn-google"
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width={20}
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="row">
                {roomlist?.map((val) => {
                  return getDashBoard(val);
                })}
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
