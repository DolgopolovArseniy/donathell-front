import { useLoaderData } from "react-router";
import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import { DashboardStatsData, getDashboardStats } from "../services/api";
import BalanceCard from "../components/dashboard/BalanceCard";
import DonationTrends from "../components/dashboard/DonationTrends";
import TopDonors from "../components/dashboard/TopDonors";
import DistributionChart from "../components/dashboard/DistributionChart";
import Button from "../components/ui/Button";

const CURRENCY_COLORS: Record<string, string> = {
  BTC: "#F7931A",
  ETH: "#627EEA",
  SOL: "#14F195",
  "USD / USDT": "#52fb15",
  EUR: "#003399",
  UAH: "#FFD700",
};

export default function DashboardPage() {
  const initialData = useLoaderData() as DashboardStatsData;
  const [data, setData] = useState<DashboardStatsData>(initialData);
  const [range, setRange] = useState<"1d" | "7d" | "30d">("7d");
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewData, setHasNewData] = useState(false);

  const fetchData = async (currentRange: "1d" | "7d" | "30d") => {
    setIsLoading(true);
    try {
      const newData = await getDashboardStats(currentRange);
      setData(newData);
      setHasNewData(false);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRangeChange = (newRange: "1d" | "7d" | "30d") => {
    if (newRange === range) return;
    setRange(newRange);
    fetchData(newRange);
  };

  useEffect(() => {
    let source: EventSource | null = null;
    let isConnected = false;

    function connectSSE() {
      const token = localStorage.getItem("token");
      if (!token) return;

      source = new EventSource(
        `http://localhost:8000/api/v1/transactions/stream?token=${token}`,
      );

      source.onopen = () => {
        isConnected = true;
      };

      source.onmessage = () => {
        setHasNewData(true);
      };

      source.onerror = () => {
        if (source) source.close();
        if (isConnected) {
          isConnected = false;
          setTimeout(connectSSE, 5000);
        }
      };
    }

    connectSSE();
    return () => {
      if (source) source.close();
    };
  }, []);

  const allBalances = [...data.cryptoBalances, ...data.fiatBalances];
  const findBalance = (code: string) =>
    allBalances.find(b => b.currency === code) || { currency: code, amount: 0, convertedAmount: 0 };

  const topRow = ["BTC", "ETH", "SOL"].map(findBalance);

  const usdt = allBalances.find(b => b.currency === "USDT");
  const usd = allBalances.find(b => b.currency === "USD");
  const mergedUsd = {
    currency: "USD / USDT",
    amount: (usdt?.amount || 0) + (usd?.amount || 0),
    convertedAmount: (usdt?.convertedAmount || 0) + (usd?.convertedAmount || 0),
  };

  const bottomRow = [mergedUsd, findBalance("EUR"), findBalance("UAH")];

  const cryptoColors = ["#F7931A", "#627EEA", "#14F195", "#8A2BE2", "#FF69B4"];
  const fiatColors = ["#52fb15", "#003399", "#FFD700", "#FF4500", "#00CED1"];

  return (
    <>
      <title>Dashboard - Donathell</title>
      <div className="flex w-full flex-col pb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold">Overview</h2>
          <div className="relative">
            <Button
              className="flex items-center gap-2 px-3 py-1.5 text-sm"
              onClick={() => fetchData(range)}
              disabled={isLoading}
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
              Refresh
            </Button>
            {hasNewData && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-donathell-main rounded-full shadow-[0_0_8px_rgba(82,251,21,0.8)] animate-pulse"></span>
            )}
          </div>
        </div>

        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {topRow.map(b => (
              <BalanceCard
                key={b.currency}
                currency={b.currency}
                amount={b.amount}
                convertedAmount={b.convertedAmount}
                colorHex={CURRENCY_COLORS[b.currency]}
              />
            ))}
            {bottomRow.map(b => (
              <BalanceCard
                key={b.currency}
                currency={b.currency}
                amount={b.amount}
                convertedAmount={b.convertedAmount}
                colorHex={CURRENCY_COLORS[b.currency]}
              />
            ))}
          </div>
        </div>

        <DonationTrends
          data={data.chartData}
          range={range}
          onRangeChange={handleRangeChange}
          isLoading={isLoading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mt-6 min-h-[300px]">
          <TopDonors donors={data.topDonors} />
          <DistributionChart
            title="Crypto Distribution"
            data={data.cryptoDistribution}
            colors={cryptoColors}
          />
          <DistributionChart
            title="Fiat Distribution"
            data={data.fiatDistribution}
            colors={fiatColors}
          />
        </div>
      </div>
    </>
  );
}

