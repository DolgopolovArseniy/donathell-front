import { CURRENCIES } from "../../constants/currencies";
import { CurrencyState } from "./CurrencySelect";

interface CurrencyListProps extends CurrencyState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  crypto: boolean;
}

function CurrencyList({
  isOpen,
  selectedCurrency,
  setIsOpen,
  setSelectedCurrency,
  crypto = true,
}: CurrencyListProps) {
  return (
    <ul className="flex flex-col p-1.5 gap-1">
      {CURRENCIES.filter((cur) => (crypto ? cur.crypto : !cur.crypto)).map(
        (cur) => (
          <li
            key={cur.code}
            className={`flex items-center justify-start px-4 gap-4 cursor-pointer hover:bg-white/5 hover:text-[#f7f8f7] duration-200 py-1 rounded-xl ${selectedCurrency.code === cur.code ? "bg-white/5" : ""}`}
            onClick={() => {
              setSelectedCurrency(cur);
              setIsOpen(!isOpen);
            }}
          >
            <img src={cur.logo} alt={cur.code} className="w-8" />
            <span>{cur.code}</span>
          </li>
        ),
      )}
    </ul>
  );
}

export default CurrencyList;
