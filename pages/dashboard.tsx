import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { REPL_MODE_SLOPPY } from "repl";
import Sidebar from "../component/Sidebar";
import { ProgressBar } from "react-bootstrap";
import { useRouter } from "next/router";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";
import Dashboard from "../component/Dashbord";
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
    }, 60000);
  }, []);

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
    return <Dashboard room={room} roomdata={roomdatas[index]} key={room} />;
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
