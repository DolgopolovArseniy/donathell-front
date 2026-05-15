import { useRef, useState } from "react";
import { AppliedFilters, getTransactions } from "../services/api";
import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { Transaction } from "../types/types";

export function useDonationsList(
  initialTransactions: Transaction[],
  initialTotal: number,
) {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(initialTotal);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({});
  const filtersRef = useRef<AppliedFilters>({});

  const totalPages = Math.ceil(total / 7);

  async function fetchTransactions(page: number, filters: AppliedFilters) {
    setIsLoading(true);
    try {
      const { transactions, total: newTotal } = await getTransactions({
        page,
        ...filters,
      });

      setAppliedFilters(filters);
      filtersRef.current = filters;

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

  return {
    transactions,
    setTransactions,
    page,
    isLoading,
    total,
    setTotal,
    totalPages,
    fetchTransactions,
    appliedFilters,
    filtersRef,
  };
}
