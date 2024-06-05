// import "./styles.css";
import { Grid } from "antd";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush,
  AreaChart,
  Area
} from "recharts";

const data = [
  {
    name: "Jan",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Feb",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "March",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "May",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "June",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "July",
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: "Aug",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Sept",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Oct",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Nov",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Dec",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

export default function LineCharts() {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  
  return (
    <div>
      {/* <h4>A demo of synchronized AreaCharts</h4>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
      </LineChart> */}
      <h4 className="p-4">Annual Trend of Approved Applications</h4>
      <LineChart
        width={screens.xs? 350: 500}
        height={screens.xs? 200: 295}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
        <Brush height={10}/>
      </LineChart>
      {/* <AreaChart
        width={500}
        height={200}
        data={data}
        syncId="anyId"
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart> */}
    </div>
  );
}