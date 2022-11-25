import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { REPL_MODE_SLOPPY } from "repl";
import Sidebar from "../component/sidebar";
interface roomdata{
  id : number
  Room : string
  ctime : number
  co2: number
  htime: number
  humidity : number
  ltime: number
  ptime: number
  pir: number
  ttime: number
  temperature: number
}
interface response{
  results: roomdata

}
export default function Home() {
  const [collapse, setCollapse] = useState("collapse");
  const [roomlist, setRoomlist] = useState<string[]>([]);
  const [roomdatas,setRoomdatas] = useState<roomdata[]>([]);


  useEffect(() => {
    fetch("/api/getRoomlist", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((json) => {

        setRoomlist(json);
        console.log(roomlist)
      });
  }, []);

  useEffect(()=>{
    console.log(roomdatas.length)

    if(roomdatas.length===0){
    roomlist.map((room)=>{
      getRoomdata(room)
    })
  }
  else{
    console.log(roomdatas)
  }
  },[roomlist])
  



  const getDashbord=(room:string,index:number)=>{
    
    return(
      
      <div key={room} className="col-xl-2 col-lg-2 col-md-2 mb-2 RoomCard">
    <div className="card border-left-primary shadow h-100 py-2 ">
        <div className="card-body ">
            <div className="row no-gutters align-items-center">
                <div className="col mr-2 ">
                    <div className="text-xl font-weight-bold text-primary text-uppercase mb-1">
                        {room}</div>
                    <div> 

                  {roomdatas[index]?.co2?<div>이산화탄소 농도   <span className="table-bordered text-xl font-weight-bold">{roomdatas[index].co2}</span></div>:null}
                  {roomdatas[index]?.humidity?<div>습도{roomdatas[index].humidity}</div>:null}
                  {roomdatas[index]?.pir?<div>모션센서{roomdatas[index].pir}</div>:null}
                   {roomdatas[index]?.temperature?<div>온도{roomdatas[index].temperature}</div>:null} 
  
                    </div>

                </div>
                <div className="col-auto">
                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div>)

  }

  
  const getRoomdata=(room:string)=>{

    fetch(`/api/getdata?Room=${room}&recent=true`,{method:
        "POST"}).then((res)=>res.json())
        .then((json : response)=>{
            setRoomdatas((recentdata)=>{
              return [...recentdata,json.results]
            })
        }) 

  }



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
    <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
            className="fas fa-download fa-sm text-white-50"></i> Generate Report</a>
</div>

<div className="row">
   {
    roomlist?.map((val,idx)=>{
      console.log(val)
      return getDashbord(val,idx)


   })}
</div>


<div className="row">

    <div className="col-xl-8 col-lg-7">
        <div className="card shadow mb-4">
            <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Earnings Overview</h6>
                <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-header">Dropdown Header:</div>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <div className="chart-area">
                    <canvas id="myAreaChart"></canvas>
                </div>
            </div>
        </div>
    </div>

    <div className="col-xl-4 col-lg-5">
        <div className="card shadow mb-4">
            <div
                className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Revenue Sources</h6>
                <div className="dropdown no-arrow">
                    <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                        aria-labelledby="dropdownMenuLink">
                        <div className="dropdown-header">Dropdown Header:</div>
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">Something else here</a>
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
                <h6 className="m-0 font-weight-bold text-primary">Projects</h6>
            </div>
            <div className="card-body">
                <h4 className="small font-weight-bold">Server Migration <span
                        className="float-right">20%</span></h4>
                <div className="progress mb-4">
            
                </div>
                <h4 className="small font-weight-bold">Sales Tracking <span
                        className="float-right">40%</span></h4>
                <div className="progress mb-4">
                   
                </div>
                <h4 className="small font-weight-bold">Customer Database <span
                        className="float-right">60%</span></h4>
                <div className="progress mb-4">
                   
                </div>
                <h4 className="small font-weight-bold">Payout Details <span
                        className="float-right">80%</span></h4>
                <div className="progress mb-4">
                 
                </div>
                <h4 className="small font-weight-bold">Account Setup <span
                        className="float-right">Complete!</span></h4>
                <div className="progress">
                  
                </div>
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
                <h6 className="m-0 font-weight-bold text-primary">Illustrations</h6>
            </div>
            <div className="card-body">
                <div className="text-center">
                        src="img/undraw_posting_photo.svg" alt="...">
                </div>
                <p>Add some quality, svg illustrations to your project courtesy of <a
                        target="_blank" rel="nofollow" href="https://undraw.co/">unDraw</a>, a
                    constantly updated collection of beautiful svg images that you can use
                    completely free and without attribution!</p>
                <a target="_blank" rel="nofollow" href="https://undraw.co/">Browse Illustrations on
                    unDraw &rarr;</a>
            </div>
        </div>

        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h6 className="m-0 font-weight-bold text-primary">Development Approach</h6>
            </div>
            <div className="card-body">
                <p>SB Admin 2 makes extensive use of Bootstrap 4 utility classNamees in order to reduce
                    CSS bloat and poor page performance. Custom CSS classNamees are used to create
                    custom components and custom utility classNamees.</p>
                <p className="mb-0">Before working with this theme, you should become familiar with the
                    Bootstrap framework, especially the utility classNamees.</p>
            </div>
        </div>

    </div>
</div>

</div>

        </div>
      </div>
        </Sidebar> 

    </div>
  );
}
