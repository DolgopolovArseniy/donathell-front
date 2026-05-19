import { ChevronDown } from "lucide-react";
import "../../../glass.css";
import CurrencyList from "./CurrencyList";
import { useClickOutside } from "../../../shared/hooks/useClickOutside";
import { Currency } from "../../../shared/types/types";

export interface CurrencyState {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
}

function CurrencySelect({
  selectedCurrency,
  setSelectedCurrency,
}: CurrencyState) {
  const { isOpen, setIsOpen, ref } = useClickOutside();

  return (
    <div ref={ref} className="relative flex flex-col gap-1">
      <label className="text-sm text-[#c1c2c1]">Currency</label>
      <button
        className={`bg-[#131416] rounded-xl pl-2 pr-1 h-11 flex items-center justify-around cursor-pointer hover:bg-[#101112] hover:text-[#f7f8f7] duration-100 w-38 glass-input`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <img
          src={selectedCurrency.logo}
          alt={selectedCurrency.code}
          className="w-7"
        />
        <span>{selectedCurrency.code}</span>
        <ChevronDown
          size={23}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden absolute z-10 top-18.5 left-1/2 -translate-x-1/2 rounded-2xl w-40 ${isOpen ? "opacity-100 max-h-100" : "opacity-0 max-h-0"} transition-all duration-200 glass-dropdown`}
      >
        <p className="font-light mx-1.5 pb-0.5 border-b border-[#2c2c2e]">
          Crypto
        </p>
        <CurrencyList
          isOpen={isOpen}
          selectedCurrency={selectedCurrency}
          crypto={true}
          setSelectedCurrency={setSelectedCurrency}
          setIsOpen={setIsOpen}
        />
        <p className="font-light mx-1.5 pb-0.5 border-y border-[#2c2c2e]">
          Fiat
        </p>
        <CurrencyList
          isOpen={isOpen}
          selectedCurrency={selectedCurrency}
          crypto={false}
          setSelectedCurrency={setSelectedCurrency}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
}

export default CurrencySelect;
