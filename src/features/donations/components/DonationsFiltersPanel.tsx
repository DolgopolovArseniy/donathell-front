import "../../../glass.css";
import Button from "../../../shared/components/Button";
import FilterField from "./FilterField";
import Input from "../../../shared/components/Input";
import { AppliedFilters } from "../../../shared/services/api";
import { CURRENCIES } from "../../../shared/constants/currencies";
import { CurrencyCode } from "../../../shared/types/types";
import { useEffect, useState } from "react";

export interface DonationsFiltersPanelProps {
  open: boolean;
  appliedFilters: AppliedFilters;
  fetchTransactions: (
    page: number,
    filters: AppliedFilters,
  ) => Promise<string | undefined>;
  setIsFilterOpen: (value: boolean) => void;
}

export default function DonationsFiltersPanel({
  open,
  appliedFilters,
  fetchTransactions,
  setIsFilterOpen,
}: DonationsFiltersPanelProps) {
  const [localFilters, setLocalFilters] = useState({
    currency: appliedFilters.currency || "",
    from: appliedFilters.from || "",
    dateFrom: appliedFilters.dateFrom || "",
    dateTo: appliedFilters.dateTo || "",
    minAmount: appliedFilters.minAmount ? String(appliedFilters.minAmount) : "",
    maxAmount: appliedFilters.maxAmount ? String(appliedFilters.maxAmount) : "",
  });

  useEffect(() => {
    if (open) {
      setLocalFilters({
        currency: appliedFilters.currency || "",
        from: appliedFilters.from || "",
        dateFrom: appliedFilters.dateFrom || "",
        dateTo: appliedFilters.dateTo || "",
        minAmount: appliedFilters.minAmount ? String(appliedFilters.minAmount) : "",
        maxAmount: appliedFilters.maxAmount ? String(appliedFilters.maxAmount) : "",
      });
    }
  }, [open, appliedFilters]);

  function resetFilters() {
    setLocalFilters({
      currency: "",
      from: "",
      dateFrom: "",
      dateTo: "",
      minAmount: "",
      maxAmount: "",
    });
    setIsFilterOpen(false);
    fetchTransactions(1, {});
  }

  async function applyFilters() {
    const newFilters: AppliedFilters = {};
    if (localFilters.currency) newFilters.currency = localFilters.currency as CurrencyCode;
    if (localFilters.from) newFilters.from = localFilters.from;
    if (localFilters.dateFrom) newFilters.dateFrom = localFilters.dateFrom;
    if (localFilters.dateTo) newFilters.dateTo = localFilters.dateTo;
    if (localFilters.minAmount) newFilters.minAmount = Number(localFilters.minAmount);
    if (localFilters.maxAmount) newFilters.maxAmount = Number(localFilters.maxAmount);

    await fetchTransactions(1, newFilters);
    setIsFilterOpen(false);
  }

  const updateField = (field: keyof typeof localFilters, value: string) => {
    setLocalFilters(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr] mt-6" : "grid-rows-[0fr]"
        }`}
    >
      <div className="overflow-hidden">
        <div className="rounded-3xl bg-[#121315] glass p-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterField label="Currency">
              <div className="flex flex-wrap gap-2">
                {CURRENCIES.map((cur) => (
                  <span
                    key={cur.code}
                    onClick={() =>
                      updateField("currency", cur.code === localFilters.currency ? "" : cur.code)
                    }
                    className={`px-2 py-1 rounded-full text-sm cursor-pointer glass ${localFilters.currency === cur.code ? "text-donathell-main" : ""
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
                value={localFilters.from}
                onChange={(e) => updateField("from", e.target.value)}
              />
            </FilterField>
            <FilterField label="Date from">
              <Input
                type="date"
                value={localFilters.dateFrom}
                onChange={(e) => updateField("dateFrom", e.target.value)}
              />
            </FilterField>
            <FilterField label="Date to">
              <Input
                type="date"
                value={localFilters.dateTo}
                onChange={(e) => updateField("dateTo", e.target.value)}
              />
            </FilterField>
            <FilterField label="Min amount">
              <Input
                inputMode="decimal"
                placeholder="0"
                value={localFilters.minAmount}
                onChange={(e) => updateField("minAmount", e.target.value)}
              />
            </FilterField>
            <FilterField label="Max amount">
              <Input
                inputMode="decimal"
                placeholder="Any"
                value={localFilters.maxAmount}
                onChange={(e) => updateField("maxAmount", e.target.value)}
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
    </div>
  );
}

