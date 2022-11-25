import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Sidebar from "../component/sidebar";
import { LineChart, Line } from "recharts";
export default function Home() {
  const [collapse, setCollapse] = useState("collapse");
  const [roomlist, setRoomlist] = useState<string[]>([]);
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 200, pv: 2500, amt: 2600 },
    { name: "Page C", uv: 200, pv: 2900, amt: 2800 },
  ];

  return (
    <div>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
