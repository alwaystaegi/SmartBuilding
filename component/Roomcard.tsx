import Link from "next/link";

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
interface DashboardProps {
  room: string;
  roomdata: roomdata;
}
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

export default function roomcard({ room, roomdata }: DashboardProps) {
  return (
    <div key={room} className="col-xl-10 col-lg-2 col-md-2 mb-2 Dashboard">
      <div className="card border-left-primary shadow h-100 py-2 ">
        <div className="card-body ">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2 ">
              <div className="row justify-content-between text-xl font-weight-bold text-primary text-uppercase mb-1">
                <Link href={`/Roomlist/${room}`}> {room}</Link>
                <div className="row">
                  <div className="text-body">현재 온도</div>
                  <div className="mx-2 text-dark">{roomdata?.temperature}℃</div>
                  <div className="text-body">현재 인원</div>
                  <div className="mx-2 text-dark">{roomdata?.pir}명</div>
                  <div className="text-body">방 밝기</div>
                  <div className="mx-2 text-dark">{roomdata?.light}</div>
                </div>
              </div>
              <div>
                {roomdata?.co2 ? (
                  <>
                    <div className="text-lg">
                      이산화탄소 농도{" "}
                      <span
                        className={`font-weight-bold text-${checkco2(
                          roomdata?.co2
                        )}`}
                      >
                        {roomdata.co2}
                      </span>
                      ppm{" "}
                    </div>
                    <ProgressBar
                      now={roomdata.co2 / 20}
                      variant={checkco2(roomdata.co2)}
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
                {roomdata?.humidity ? (
                  <>
                    <div className="text-lg">
                      습도
                      <span
                        className={`font-weight-bold text-${checkhumidity(
                          roomdata.humidity,
                          roomdata.temperature
                        )}`}
                      >
                        {roomdata.humidity}
                      </span>
                    </div>
                    <ProgressBar
                      now={roomdata.humidity}
                      variant={checkhumidity(
                        roomdata.humidity,
                        roomdata.temperature
                      )}
                    ></ProgressBar>
                    <div className="d-flex justify-content-between text-xs">
                      <div>건조</div>
                      <div></div>
                      <div></div>
                      <div>{roomdata.temperature >= 24 ? "적정" : null}</div>
                      <div>
                        {roomdata.temperature < 24 && roomdata.temperature >= 21
                          ? "적정"
                          : null}
                      </div>
                      <div>
                        {roomdata.temperature < 21 && roomdata.temperature >= 18
                          ? "적정"
                          : null}
                        {roomdata.temperature >= 24 ? "습함" : null}
                      </div>
                      <div>
                        {roomdata.temperature < 18 ? "적정" : null}
                        {roomdata.temperature < 24 && roomdata.temperature >= 21
                          ? "습함"
                          : null}
                      </div>
                      <div>
                        {roomdata.temperature < 21 && roomdata.temperature >= 18
                          ? "습함"
                          : null}
                      </div>
                      <div>{roomdata.temperature < 18 ? "습함" : null}</div>
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
}
