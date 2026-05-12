import { useLoaderData } from "react-router";
import "../glass.css";
import { CurrencyCode, Transaction } from "../types/types";
import { useState } from "react";
import { AppliedFilters, getTransactions } from "../services/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { LoaderCircle, TextAlignJustify } from "lucide-react";
import Button from "../components/ui/Button";
import DonationsTable from "../components/donations/DonationsTable";
import DonationsFiltersPanel from "../components/donations/DonationsFiltersPanel";

export default function DonationsPage() {
  const { transactions: initialTransactions, total: initialTotal } =
    useLoaderData() as {
      transactions: Transaction[];
      total: number;
    };
  const [transactions, setTransactions] = useState(initialTransactions);

  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [isFiltersOpen, setIsFilterOpen] = useState(false);

  const [total, setTotal] = useState(initialTotal);

  const [currency, setCurrency] = useState<CurrencyCode | "">("");
  const [from, setFrom] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});

  const totalPages = Math.ceil(total / 7);

  async function fetchTransactions(page: number, filters: AppliedFilters) {
    setIsLoading(true);
    try {
      const { transactions, total: newTotal } = await getTransactions({
        page,
        ...filters,
      });
      setTransactions(transactions);
      setTotal(newTotal);
      setPage(page);
    } catch (err) {
      if (isAxiosError(err)) {
        return toast.error("Failed to load transactions");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <title>Donations - Donathell</title>
      <div className="flex w-full max-w-260 flex-col">
        <div className="flex flex-col gap-1 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl">
          <h2>Donations</h2>
          <div className="flex items-center gap-8">
            <div>
              <Button
                className="flex items-center gap-1.5 px-1.5 py-1 text-sm"
                onClick={() => setIsFilterOpen(!isFiltersOpen)}
              >
                <TextAlignJustify
                  size={20}
                  className={`duration-100 ${isFiltersOpen ? "rotate-90" : ""}`}
                />
                Filter
              </Button>
            </div>
            <span>{total} total</span>
          </div>
        </div>
        <DonationsFiltersPanel
          open={isFiltersOpen}
          currency={currency}
          from={from}
          dateFrom={dateFrom}
          dateTo={dateTo}
          minAmount={minAmount}
          maxAmount={maxAmount}
          setCurrency={setCurrency}
          setFrom={setFrom}
          setDateFrom={setDateFrom}
          setDateTo={setDateTo}
          setMinAmount={setMinAmount}
          setMaxAmount={setMaxAmount}
          setAppliedFilters={setAppliedFilters}
          fetchTransactions={fetchTransactions}
          setIsFilterOpen={setIsFilterOpen}
          page={page}
        />
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle
              className="animate-spin text-donathell-main"
              size={80}
            />
          </div>
        ) : transactions.length > 0 ? (
          <>
            <DonationsTable transactions={transactions} />
            <div className="flex justify-between items-center mt-6">
              <Button
                onClick={() => fetchTransactions(page - 1, appliedFilters)}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span>
                {page}/{totalPages}
              </span>
              <Button
                onClick={() => fetchTransactions(page + 1, appliedFilters)}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-[#121315] px-4 py-8 text-center sm:p-10 glass mt-6">
            <p className="text-[#666]">No donations yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
