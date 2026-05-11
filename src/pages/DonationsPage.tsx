import { useLoaderData } from "react-router";
import "../glass.css";
import { Transaction } from "../types/types";

export default function DonationsPage() {
  const transactions = useLoaderData() as Transaction[];

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

  return (
    <>
      <title>Donations - Donathell</title>
      <div className="flex w-full max-w-260 flex-col gap-6 sm:gap-10">
        <div className="flex flex-col gap-1 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl">
          <h2>Donations</h2>
          <span>{transactions.length} total</span>
        </div>
        {transactions.length > 0 ? (
          <div className="overflow-x-auto rounded-3xl bg-[#121315] shadow-lg/15 [-webkit-overflow-scrolling:touch]">
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
                    <td className={tdClassName}>
                      {formatDate(t.transactionDate)}
                    </td>
                    <td className={tdClassName}>
                      <span className="px-2 py-1 rounded-full glass">
                        {t.currency}
                      </span>
                    </td>
                    <td className={`${tdClassName} text-right`}>
                      {formatAmount(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-3xl border border-[#202123] bg-[#121315] px-4 py-8 text-center sm:p-10">
            <p className="text-[#666]">No donations yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
