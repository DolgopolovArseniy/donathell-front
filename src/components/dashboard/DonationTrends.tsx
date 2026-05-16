import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartDataItem } from "../../services/api";
import { formatCompactNumber } from "../../utils/format";

interface DonationTrendsProps {
  data: ChartDataItem[];
  range: string;
  onRangeChange: (range: "1d" | "7d" | "30d") => void;
  isLoading: boolean;
}

export default function DonationTrends({ data, range, onRangeChange, isLoading }: DonationTrendsProps) {
  const ranges: ("1d" | "7d" | "30d")[] = ["1d", "7d", "30d"];

  return (
    <div className="glass rounded-3xl bg-[#121315] p-6 w-full mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Donation Trends</h3>
        <div className="flex bg-[#1a1b1e] rounded-full p-1 glass">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => onRangeChange(r)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                range === r 
                  ? "bg-donathell-main text-[#121315]" 
                  : "text-[#888] hover:text-white"
              }`}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      
      <div className={`h-72 w-full transition-opacity duration-300 ${isLoading ? "opacity-50" : "opacity-100"}`}>
        {data.length === 0 ? (
           <div className="h-full flex items-center justify-center text-[#666]">No data for this period</div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#52fb15" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#52fb15" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#666", fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: "#666", fontSize: 12 }}
                tickFormatter={(val) => `$${formatCompactNumber(val)}`}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-dropdown p-3 rounded-xl border border-white/10">
                        <p className="text-[#888] text-xs mb-1">{label}</p>
                        <p className="text-donathell-main font-bold">
                          ${Number(payload[0].value).toFixed(2)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#52fb15" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
