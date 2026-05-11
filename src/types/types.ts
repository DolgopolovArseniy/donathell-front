export type CurrencyCode =
  | "USDT"
  | "SOL"
  | "ETH"
  | "BTC"
  | "EUR"
  | "USD"
  | "UAH";

export interface Currency {
  code: CurrencyCode;
  logo: string;
  crypto: boolean;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  donationSlug: string;
}

export interface Transaction {
  _id: string;
  amount: number;
  currency: CurrencyCode;
  from: string;
  to: string;
  message: string;
  transactionStatus: string;
  transactionDate: string;
}
