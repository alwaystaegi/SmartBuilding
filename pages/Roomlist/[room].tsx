import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Sidebar from "../../component/sidebar";
import { LineChart, Line } from "recharts";

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

export default function Room() {
  const [room, setRoom] = useState("");
  const [roomdata, setRoomdata] = useState<roomdata[]>([]);
  const router = useRouter();
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  useEffect(() => {
    setRoom(router.query.room?.toString() || "");
  }, [router.query]);

  useEffect(() => {
    if (room)
      fetch(`/api/getdata?Room=${room}&recent=false`, { method: "POST" })
        .then((res) => res.json())
        .then((json: roomdata[]) => {
          console.log(json);
          setRoomdata(json);
        });
  }, [room]);

  const getChart = () => {
    return (
      <>
        {roomdata[0]?.co2 ? (
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">CO2</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {roomdata[0]?.humidity ? (
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">HUMIDITY</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {roomdata[0]?.light ? (
          <div className="col-xl-6 col-lg-6">
            <div className="card shadow mb-4">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Light</h6>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="myAreaChart"></canvas>
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
              <a
                href="#"
                className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
              >
                <i className="fas fa-download fa-sm text-white-50"></i> Generate
                Report
              </a>
            </div>

            <div className="row">
              {roomdata ? getChart() : null}

              <div className="col-xl-4 col-lg-5">
                <div className="card shadow mb-4">
                  <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Revenue Sources
                    </h6>
                    <div className="dropdown no-arrow">
                      <a
                        className="dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <div className="dropdown-header">Dropdown Header:</div>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="chart-pie pt-4 pb-2">
                      <canvas id="myPieChart"></canvas>
                    </div>
                    <div className="mt-4 text-center small">
                      <span className="mr-2">
                        <i className="fas fa-circle text-primary"></i> Direct
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-success"></i> Social
                      </span>
                      <span className="mr-2">
                        <i className="fas fa-circle text-info"></i> Referral
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Projects
                    </h6>
                  </div>
                  <div className="card-body">
                    <h4 className="small font-weight-bold">
                      Server Migration <span className="float-right">20%</span>
                    </h4>
                    <div className="progress mb-4"></div>
                    <h4 className="small font-weight-bold">
                      Sales Tracking <span className="float-right">40%</span>
                    </h4>
                    <div className="progress mb-4"></div>
                    <h4 className="small font-weight-bold">
                      Customer Database <span className="float-right">60%</span>
                    </h4>
                    <div className="progress mb-4"></div>
                    <h4 className="small font-weight-bold">
                      Payout Details <span className="float-right">80%</span>
                    </h4>
                    <div className="progress mb-4"></div>
                    <h4 className="small font-weight-bold">
                      Account Setup{" "}
                      <span className="float-right">Complete!</span>
                    </h4>
                    <div className="progress"></div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-primary text-white shadow">
                      <div className="card-body">
                        Primary
                        <div className="text-white-50 small">#4e73df</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-success text-white shadow">
                      <div className="card-body">
                        Success
                        <div className="text-white-50 small">#1cc88a</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-info text-white shadow">
                      <div className="card-body">
                        Info
                        <div className="text-white-50 small">#36b9cc</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-warning text-white shadow">
                      <div className="card-body">
                        Warning
                        <div className="text-white-50 small">#f6c23e</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-danger text-white shadow">
                      <div className="card-body">
                        Danger
                        <div className="text-white-50 small">#e74a3b</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-secondary text-white shadow">
                      <div className="card-body">
                        Secondary
                        <div className="text-white-50 small">#858796</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-light text-black shadow">
                      <div className="card-body">
                        Light
                        <div className="text-black-50 small">#f8f9fc</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 mb-4">
                    <div className="card bg-dark text-white shadow">
                      <div className="card-body">
                        Dark
                        <div className="text-white-50 small">#5a5c69</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 mb-4">
                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Illustrations
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="text-center"></div>
                    <p>
                      Add some quality, svg illustrations to your project
                      courtesy of , a constantly updated collection of beautiful
                      svg images that you can use completely free and without
                      attribution!
                    </p>
                  </div>
                </div>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Development Approach
                    </h6>
                  </div>
                  <div className="card-body">
                    <p>
                      SB Admin 2 makes extensive use of Bootstrap 4 utility
                      classNamees in order to reduce CSS bloat and poor page
                      performance. Custom CSS classNamees are used to create
                      custom components and custom utility classNamees.
                    </p>
                    <p className="mb-0">
                      Before working with this theme, you should become familiar
                      with the Bootstrap framework, especially the utility
                      classNamees.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
