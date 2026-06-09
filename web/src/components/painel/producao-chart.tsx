"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function ProducaoChart({ data }: { data: { mes: string; produzido: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc4" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#6b5d4f" }} axisLine={{ stroke: "#e8dcc4" }} tickLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#6b5d4f" }} axisLine={false} tickLine={false} width={42} />
        <Tooltip
          cursor={{ fill: "#8a1c2410" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e8dcc4",
            background: "#fcf8f0",
            fontSize: 13,
          }}
          labelStyle={{ color: "#2b2018", fontWeight: 600 }}
          formatter={(v) => [`${v} kg`, "Produzido"]}
        />
        <Bar dataKey="produzido" fill="#8a1c24" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
