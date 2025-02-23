"use client";

import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    dépenses: 4000,
    revenus: 2400,
  },
  {
    name: "Fév",
    dépenses: 3000,
    revenus: 1398,
  },
  {
    name: "Mar",
    dépenses: 2000,
    revenus: 9800,
  },
  {
    name: "Avr",
    dépenses: 2780,
    revenus: 3908,
  },
  {
    name: "Mai",
    dépenses: 1890,
    revenus: 4800,
  },
  {
    name: "Jun",
    dépenses: 2390,
    revenus: 3800,
  },
  {
    name: "Jul",
    dépenses: 3490,
    revenus: 4300,
  },
  {
    name: "Aout",
    dépenses: 3490,
    revenus: 4300,
  },
  {
    name: "Sept",
    dépenses: 3490,
    revenus: 4300,
  },
  {
    name: "Oct",
    dépenses: 3490,
    revenus: 4300,
  },
  {
    name: "Nov",
    dépenses: 3490,
    revenus: 4300,
  },
  {
    name: "Dec",
    dépenses: 7272,
    revenus: 8300,
  },
];

const FinanceChart = () => {
  return (
    <div className="bg-white rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Finances</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false}  tickMargin={20}/>
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="revenus"
            stroke="#C3EBFA"
            strokeWidth={5}
          />
          <Line type="monotone" dataKey="dépenses" stroke="#CFCEFF" strokeWidth={5}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FinanceChart;