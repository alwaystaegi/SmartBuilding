import React from "react";
import { RadialBarChart, RadialBar, Legend } from "recharts";
import { ProgressBar } from "react-bootstrap";
export default function App() {
  return (
    <>
      <ProgressBar now={50} />
      <div>123</div>
    </>
    // <RadialBarChart
    //   width={500}
    //   height={300}
    //   cx={150}
    //   cy={150}
    //   innerRadius={20}
    //   outerRadius={140}
    //   barSize={10}
    //   data={[
    //     {
    //       name: "18-24",
    //       uv: 31,
    //       pv: 2400,
    //       fill: "#8884d8",
    //     },
    //     {
    //       name: "25-29",
    //       uv: 28.15,
    //       pv: 4567,
    //       fill: "#83a6ed",
    //     },
    //     {
    //       name: "30-34",
    //       uv: 15.69,
    //       pv: 1398,
    //       fill: "#8dd1e1",
    //     },
    //     {
    //       name: "35-39",
    //       uv: 8.22,
    //       pv: 9800,
    //       fill: "#82ca9d",
    //     },
    //     {
    //       name: "40-49",
    //       uv: 8.63,
    //       pv: 3908,
    //       fill: "#a4de6c",
    //     },
    //     {
    //       name: "50+",
    //       uv: 2.63,
    //       pv: 4800,
    //       fill: "#d0ed57",
    //     },
    //     {
    //       name: "unknow",
    //       uv: 6.67,
    //       pv: 4800,
    //       fill: "#ffc658",
    //     },
    //   ]}
    // >
    //   <RadialBar
    //     label={{ position: "insideStart", fill: "#fff" }}
    //     background
    //     dataKey="uv"
    //   />
    //   <Legend
    //     iconSize={10}
    //     width={120}
    //     height={140}
    //     layout="vertical"
    //     verticalAlign="middle"
    //     wrapperStyle={{
    //       top: 0,
    //       left: 350,
    //       lineHeight: "24px",
    //     }}
    //   />
    // </RadialBarChart>
  );
}
