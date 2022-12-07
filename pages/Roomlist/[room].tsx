import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../component/Sidebar";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { O } from "chart.js/dist/chunks/helpers.core";
// a
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface roomdata {
  id: number;
  Room: string;
  ctime: Date;
  co2: number;
  htime: Date;
  humidity: number;
  ltime: Date;
  light: number;
  ptime: Date;
  pir: number;
  ttime: Date;
  temperature: number;
}
interface datas {
  data: number;
  time: number;
}
interface response {
  max: roomdata[];
  min: roomdata[];
}

export default function Room() {
  const [room, setRoom] = useState("");
  const [roomdatas, setRoomdatas] = useState<roomdata[]>([]);
  const [minRoomDatas, setMinRoomDatas] = useState<roomdata[]>([]);
  const [maxRoomDatas, setMaxRoomDatas] = useState<roomdata[]>([]);
  const [timerID, setTimerID] = useState<NodeJS.Timer>();
  const router = useRouter();
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  useEffect(() => {
    setRoom(router.query.room?.toString() || "");
  }, [router.query]);

  useEffect(() => {
    if (room) setRoomdatas([]);
    fetch(`/api/getdata?Room=${room}&recent=false`, { method: "POST" })
      .then((res) => res.json())
      .then(({ max, min }: response) => {
        setMaxRoomDatas(max);
        setMinRoomDatas(min);
        console.log(
          max.map((data) => {
            return converttime(data.ctime);
          })
        );
      });
    if (timerID) {
      window.clearInterval(timerID);
    }
    const timer = setInterval(() => {
      fetch(`/api/getdata?Room=${room}&recent=false`, { method: "POST" })
        .then((res) => res.json())
        .then(({ max, min }: response) => {
          setMaxRoomDatas(max);
          setMinRoomDatas(min);
          console.log(
            max.map((data) => {
              return converttime(data.ctime);
            })
          );
        });
    }, 6000);
    setTimerID(timer);
  }, [room]);

  const converttime = (getdate: Date) => {
    let date = new Date(getdate);

    return (
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0")
    );
  };

  const getChart = () => {
    return (
      <>
        {/* 이산화탄소 차트 */}
        {maxRoomDatas[0]?.co2 ? (
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">CO2</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  {/* 차트 */}
                  <Line
                    data={{
                      labels: maxRoomDatas.map((data) => {
                        return converttime(data.ctime);
                      }),
                      datasets: [
                        {
                          label: "maxCO2",
                          data: [
                            ...maxRoomDatas.map((data) => {
                              return data.co2;
                            }),
                            350,
                            600,
                          ],
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "minCO2",
                          data: minRoomDatas.map((data) => {
                            return data.co2;
                          }),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                    height={""}
                    width={""}
                    options={{
                      responsive: false,
                      scales: {},
                      maintainAspectRatio: false,
                      aspectRatio: 1,
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: "x",
                          intersect: false,
                        },
                      },
                    }}
                  ></Line>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {/* 습도 차트  */}
        {maxRoomDatas[0]?.humidity ? (
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">HUMIDITY</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  {/* 차트 */}
                  <Line
                    data={{
                      labels: maxRoomDatas.map((data) => {
                        return converttime(data.htime);
                      }),
                      datasets: [
                        {
                          label: "maxHumidity",
                          data: [
                            ...maxRoomDatas.map((data) => {
                              return data.humidity;
                            }),
                          ],
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "minHumidity",
                          data: minRoomDatas.map((data) => {
                            return data.humidity;
                          }),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                    height={""}
                    width={""}
                    options={{
                      responsive: false,
                      scales: {},
                      maintainAspectRatio: false,
                      aspectRatio: 1,
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: "x",
                          intersect: false,
                        },
                      },
                    }}
                  ></Line>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {maxRoomDatas[0]?.light ? (
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Light</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Line
                    data={{
                      labels: maxRoomDatas.map((data) => {
                        return converttime(data.ltime);
                      }),
                      datasets: [
                        {
                          label: "maxLight",
                          data: [
                            ...maxRoomDatas.map((data) => {
                              return data.light;
                            }),
                            0,
                          ],
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "minLight",
                          data: minRoomDatas.map((data) => {
                            return data.light;
                          }),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                    height={""}
                    width={""}
                    options={{
                      responsive: false,
                      scales: {},
                      maintainAspectRatio: false,
                      aspectRatio: 1,
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: "x",
                          intersect: false,
                        },
                      },
                    }}
                  ></Line>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {maxRoomDatas[0]?.pir >= 0 ? (
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">방문자</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Line
                    data={{
                      labels: maxRoomDatas.map((data) => {
                        return converttime(data.ptime);
                      }),
                      datasets: [
                        {
                          label: "maxPir",
                          data: [
                            ...maxRoomDatas.map((data) => {
                              return data.pir;
                            }),
                            0,
                          ],
                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "minPir",
                          data: minRoomDatas.map((data) => {
                            return data.pir;
                          }),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                    height={""}
                    width={""}
                    options={{
                      responsive: false,
                      maintainAspectRatio: false,
                      aspectRatio: 1,
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: "x",
                          intersect: false,
                        },
                      },
                    }}
                  ></Line>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {maxRoomDatas[0]?.temperature >= 0 ? (
          <div className="col-xl-5 col-lg-6 col-md-8">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">실내온도</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <Line
                    data={{
                      labels: maxRoomDatas.map((data) => {
                        return converttime(data.ttime);
                      }),
                      datasets: [
                        {
                          label: "최고온도",
                          data: maxRoomDatas.map((data) => {
                            return data.temperature;
                          }),

                          borderColor: "rgb(255, 99, 132)",
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                        {
                          label: "최저온도",
                          data: minRoomDatas.map((data) => {
                            return data.temperature;
                          }),
                          borderColor: "rgb(53, 162, 235)",
                          backgroundColor: "rgba(53, 162, 235, 0.5)",
                        },
                      ],
                    }}
                    height={""}
                    width={""}
                    options={{
                      responsive: false,
                      scales: {},
                      maintainAspectRatio: false,
                      aspectRatio: 1,
                      plugins: {
                        tooltip: {
                          enabled: true,
                          mode: "x",
                          intersect: false,
                        },
                      },
                    }}
                  ></Line>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <Sidebar>
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
            <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search"></form>
          </nav>
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
              <h1 className="h3 mb-0 text-gray-800">
                <span className="font-weight-bold">{room}</span> 호실 현황
              </h1>
            </div>

            <div className="row">{maxRoomDatas ? getChart() : null}</div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
