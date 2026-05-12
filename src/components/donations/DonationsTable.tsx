import "../../glass.css";
import { Transaction } from "../../types/types";

const thClassName =
  "font-semibold text-left py-2 px-3 text-sm sm:px-5 sm:text-base";
const thAmountClassName =
  "font-semibold text-right py-2 px-3 text-sm sm:px-5 sm:text-base";
const tdClassName = "py-3 px-3 align-top sm:py-4 sm:px-5";

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatAmount(amount: number): string {
  return amount.toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

interface DonationsTableProps {
  transactions: Transaction[];
}

export default function DonationsTable({ transactions }: DonationsTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-[#121315] mt-6 shadow-lg/15 [-webkit-overflow-scrolling:touch]">
      <table className="glass w-full min-w-xl">
        <thead>
          <tr className="border-b border-[#101115]">
            <th className={thClassName}>Donor</th>
            <th className={thClassName}>Date</th>
            <th className={thClassName}>Currency</th>
            <th className={thAmountClassName}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id} className="border-b border-[#101115]">
              <td className={tdClassName}>
                <div>
                  <p>{t.from}</p>
                  {t.message && (
                    <p className="text-[#666] mt-1 leading-relaxed wrap-break-word">
                      {t.message}
                    </p>
                  )}
                </div>
              </td>
              <td className={tdClassName}>{formatDate(t.transactionDate)}</td>
              <td className={tdClassName}>
                <span className="px-2 py-1 rounded-full glass">{t.currency}</span>
              </td>
              <td className={`${tdClassName} text-right`}>
                {formatAmount(t.amount)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
