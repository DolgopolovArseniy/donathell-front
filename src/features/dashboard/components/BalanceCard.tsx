import "../../../glass.css";
import { formatCurrency } from "../../../shared/utils/format";

interface BalanceCardProps {
  currency: string;
  amount: number;
  convertedAmount: number;
  colorHex?: string;
}

export default function BalanceCard({ currency, amount, convertedAmount, colorHex = "#52fb15" }: BalanceCardProps) {
  const formattedConverted = formatCurrency(convertedAmount, true);
  
  const isFiat = ["USD", "EUR", "UAH", "USD / USDT"].includes(currency);
  const formattedAmount = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: isFiat ? 2 : 2,
    maximumFractionDigits: isFiat ? 2 : 6,
  }).format(amount);

  return (
    <div className="glass rounded-3xl bg-[#121315] p-6 flex flex-col justify-between relative overflow-hidden transition-all hover:scale-[1.02]">
      <div className="flex justify-between items-start mb-4">
        <span 
          className="px-3 py-1 text-sm font-semibold rounded-full bg-opacity-10 backdrop-blur-sm"
          style={{ backgroundColor: `${colorHex}1A`, color: colorHex, border: `1px solid ${colorHex}33` }}
        >
          {currency}
        </span>
        <span className="text-[#666] text-sm font-medium">{formattedConverted}</span>
      </div>
      <div className="mt-4">
        <span className="text-3xl font-bold text-white tracking-tight">{formattedAmount}</span>
      </div>
    </div>
  );
}
