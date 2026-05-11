import usdt from "../assets/images/usdt.png";
import eth from "../assets/images/eth.png";
import btc from "../assets/images/btc.png";
import sol from "../assets/images/sol.png";
import eu from "../assets/images/eu.png";
import us from "../assets/images/us.png";
import ua from "../assets/images/ua.png";
import { Currency } from "../types/types";

export const CURRENCIES: Currency[] = [
  {
    code: "USDT",
    logo: usdt,
    crypto: true,
  },
  {
    code: "SOL",
    logo: sol,
    crypto: true,
  },
  {
    code: "ETH",
    logo: eth,
    crypto: true,
  },
  {
    code: "BTC",
    logo: btc,
    crypto: true,
  },
  {
    code: "EUR",
    logo: eu,
    crypto: false,
  },
  {
    code: "USD",
    logo: us,
    crypto: false,
  },
  {
    code: "UAH",
    logo: ua,
    crypto: false,
  },
];
