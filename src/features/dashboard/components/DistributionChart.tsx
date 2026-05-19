import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { DistributionItem } from "../../../shared/services/api";
import { formatCurrency } from "../../../shared/utils/format";

interface DistributionChartProps {
  title: string;
  data: DistributionItem[];
  colors: string[];
}

export default function DistributionChart({ title, data, colors }: DistributionChartProps) {
  const totalValue = data.reduce((sum, item) => sum + item.convertedValue, 0);

  return (
    <div className="glass rounded-3xl bg-[#121315] p-6 h-full flex flex-col">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      {data.length === 0 || totalValue === 0 ? (
        <div className="flex-1 flex items-center justify-center text-[#666]">No data available</div>
      ) : (
        <div className="flex-1 min-h-[200px] relative mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="convertedValue"
                stroke="none"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const dataPayload = payload[0].payload;
                    const percent = ((dataPayload.convertedValue / totalValue) * 100).toFixed(1);
                    return (
                      <div className="glass-dropdown p-3 rounded-xl border border-white/10 flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: payload[0].color }}></div>
                          <span className="font-medium text-white">{dataPayload.name}</span>
                        </div>
                        <span className="text-[#888] text-sm font-semibold mt-1 cursor-help" title={formatCurrency(dataPayload.convertedValue)}>
                          {formatCurrency(dataPayload.convertedValue, true)} <span className="text-donathell-main text-xs ml-1">({percent}%)</span>
                        </span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-[#666]">Total Value</span>
            <span className="text-lg font-bold text-white tracking-tighter" title={formatCurrency(totalValue)}>
              {formatCurrency(totalValue, true)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
