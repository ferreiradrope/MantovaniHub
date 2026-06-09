"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatBRL } from "@/lib/utils";

/**
 * Gráfico de barras por mês. Por padrão exibe produção (kg); com `moeda`,
 * formata os valores em reais — reaproveitado nos relatórios de produção e financeiro.
 */
export function ProducaoChart({
  data,
  dataKey = "produzido",
  label = "Produzido",
  color = "#8a1c24",
  moeda = false,
}: {
  data: { mes: string; [key: string]: string | number }[];
  dataKey?: string;
  label?: string;
  color?: string;
  moeda?: boolean;
}) {
  const fmt = (v: number) => (moeda ? formatBRL(v) : `${v} kg`);
  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: moeda ? 4 : -16, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc4" vertical={false} />
        <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#6b5d4f" }} axisLine={{ stroke: "#e8dcc4" }} tickLine={false} />
        <YAxis
          tick={{ fontSize: 12, fill: "#6b5d4f" }}
          axisLine={false}
          tickLine={false}
          width={moeda ? 64 : 42}
          tickFormatter={moeda ? (v) => (v >= 1000 ? `R$${Math.round(v / 1000)}k` : `R$${v}`) : undefined}
        />
        <Tooltip
          cursor={{ fill: "#8a1c2410" }}
          contentStyle={{
            borderRadius: 12,
            border: "1px solid #e8dcc4",
            background: "#fcf8f0",
            fontSize: 13,
          }}
          labelStyle={{ color: "#2b2018", fontWeight: 600 }}
          formatter={(v) => [fmt(Number(v)), label]}
        />
        <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}
