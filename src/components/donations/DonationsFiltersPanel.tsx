import "../../glass.css";
import Button from "../ui/Button";
import FilterField from "./FilterField";
import Input from "../ui/Input";
import { AppliedFilters } from "../../services/api";
import { CURRENCIES } from "../../constants/currencies";
import { CurrencyCode } from "../../types/types";

export interface DonationsFiltersPanelProps {
  open: boolean;
  currency: string;
  from: string;
  dateFrom: string;
  dateTo: string;
  minAmount: string;
  maxAmount: string;
  setCurrency: (value: CurrencyCode | "") => void;
  setFrom: (value: string) => void;
  setDateFrom: (value: string) => void;
  setDateTo: (value: string) => void;
  setMinAmount: (value: string) => void;
  setMaxAmount: (value: string) => void;
  setAppliedFilters: (filters: AppliedFilters) => void;
  fetchTransactions: (
    page: number,
    filters: AppliedFilters,
  ) => Promise<string | undefined>;
  setIsFilterOpen: (value: boolean) => void;
  page: number;
}

export default function DonationsFiltersPanel({
  open,
  currency,
  from,
  dateFrom,
  dateTo,
  minAmount,
  maxAmount,
  setCurrency,
  setFrom,
  setDateFrom,
  setDateTo,
  setMinAmount,
  setMaxAmount,
  setAppliedFilters,
  fetchTransactions,
  setIsFilterOpen,
  page,
}: DonationsFiltersPanelProps) {
  function resetFilters() {
    setCurrency("");
    setFrom("");
    setDateFrom("");
    setDateTo("");
    setMinAmount("");
    setMaxAmount("");

    setAppliedFilters({});
    fetchTransactions(1, {});
  }

  async function applyFilters() {
    const newFilters: AppliedFilters = {};
    if (currency) newFilters.currency = currency as CurrencyCode;
    if (from) newFilters.from = from;
    if (dateFrom) newFilters.dateFrom = dateFrom;
    if (dateTo) newFilters.dateTo = dateTo;
    if (minAmount) newFilters.minAmount = Number(minAmount);
    if (maxAmount) newFilters.maxAmount = Number(maxAmount);
    setAppliedFilters(newFilters);
    await fetchTransactions(page, newFilters);
    setIsFilterOpen(false);
  }

  return (
    <div
      className={`overflow-hidden transition-all duration-100 ${
        open ? "max-h-160 mt-6" : "max-h-0"
      }`}
    >
      <div className="rounded-3xl bg-[#121315] glass p-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <FilterField label="Currency">
            <div className="flex flex-wrap gap-2">
              {CURRENCIES.map((cur) => (
                <span
                  key={cur.code}
                  onClick={() =>
                    setCurrency(cur.code === currency ? "" : cur.code)
                  }
                  className={`px-2 py-1 rounded-full text-sm cursor-pointer glass ${
                    currency === cur.code ? "text-donathell-main" : ""
                  }`}
                >
                  {cur.code}
                </span>
              ))}
            </div>
          </FilterField>
          <FilterField label="From">
            <Input
              placeholder="Donor name"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </FilterField>
          <FilterField label="Date from">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </FilterField>
          <FilterField label="Date to">
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </FilterField>
          <FilterField label="Min amount">
            <Input
              inputMode="decimal"
              placeholder="0"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </FilterField>
          <FilterField label="Max amount">
            <Input
              inputMode="decimal"
              placeholder="Any"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </FilterField>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <Button className="text-sm" onClick={() => resetFilters()}>
            Reset
          </Button>
          <Button className="text-sm" onClick={() => applyFilters()}>
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
