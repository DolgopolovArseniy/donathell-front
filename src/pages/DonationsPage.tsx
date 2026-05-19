import { useLoaderData } from "react-router";
import "../glass.css";
import { CurrencyCode, Transaction } from "../shared/types/types";
import { useEffect, useState, useRef } from "react";
import { LoaderCircle, TextAlignJustify } from "lucide-react";
import Button from "../shared/components/Button";
import { DonationsTable } from "../features/donations";
import { DonationsFiltersPanel } from "../features/donations";
import { useDonationsList } from "../features/donations";
import { useClickOutside } from "../shared/hooks/useClickOutside";

export default function DonationsPage() {
  const { transactions: initialTransactions, total: initialTotal } =
    useLoaderData() as {
      transactions: Transaction[];
      total: number;
    };

  const {
    transactions,
    page,
    isLoading,
    total,
    setTotal,
    totalPages,
    fetchTransactions,
    appliedFilters,
    filtersRef,
  } = useDonationsList(initialTransactions, initialTotal);

  const [newDonationsCount, setNewDonationsCount] = useState(0);

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

      source.onmessage = (e) => {
        const transaction = JSON.parse(e.data);
        const filters = filtersRef.current;
        if (filters.currency && transaction.currency !== filters.currency) return;
        if (filters.minAmount && transaction.amount < filters.minAmount) return;
        if (filters.maxAmount && transaction.amount > filters.maxAmount) return;
        if (filters.dateFrom && transaction.transactionDate < filters.dateFrom)
          return;
        if (filters.dateTo && transaction.transactionDate > filters.dateTo)
          return;
        if (
          filters.from &&
          !transaction.from.toLowerCase().includes(filters.from.toLowerCase())
        )
          return;

        setTotal((t) => t + 1);
        setNewDonationsCount((prev) => prev + 1);
      };

      source.onerror = () => {
        if (source) {
          source.close();
        }
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

  const { isOpen: isFiltersOpen, setIsOpen: setIsFilterOpen, ref: filterPanelRef } = useClickOutside(false);

  return (
    <>
      <title>Donations - Donathell</title>
      <div className="flex w-full flex-col">
        <div ref={filterPanelRef}>
          <div className="flex flex-col gap-1 text-lg sm:flex-row sm:items-center sm:justify-between sm:text-xl">
            <h2 className="text-xl sm:text-2xl font-bold">Donations</h2>
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
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 bg-white/5 border border-white/10 rounded-full shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-donathell-main opacity-20"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-donathell-main"></span>
                </span>
                <span className="text-sm font-bold text-white/80 tracking-tight">
                  {total} <span className="text-[10px] uppercase text-[#666] ml-1 font-black">Total</span>
                </span>
              </div>
            </div>
          </div>
          <DonationsFiltersPanel
            open={isFiltersOpen}
            appliedFilters={appliedFilters}
            fetchTransactions={fetchTransactions}
            setIsFilterOpen={setIsFilterOpen}
          />
        </div>
        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoaderCircle
              className="animate-spin text-donathell-main"
              size={80}
            />
          </div>
        ) : transactions.length > 0 ? (
          <>
            {newDonationsCount > 0 && (
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => {
                    fetchTransactions(1, appliedFilters);
                    setNewDonationsCount(0);
                  }}
                  className="glass-button flex items-center gap-3 rounded-full border border-donathell-main/30 bg-donathell-main/10 px-5 py-2.5 text-sm font-medium text-donathell-main transition-all hover:bg-donathell-main/20 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-donathell-main opacity-75"></span>
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-donathell-main"></span>
                  </span>
                  {newDonationsCount} new donation{newDonationsCount > 1 ? "s" : ""} available
                </button>
              </div>
            )}
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
                disabled={page === totalPages || totalPages === 1}
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
