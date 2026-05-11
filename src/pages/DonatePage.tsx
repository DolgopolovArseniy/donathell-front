import { useState } from "react";
import CurrencySelect from "../components/common/CurrencySelect";
import DonationFormField from "../components/form/DonationFormField";
import { CURRENCIES } from "../constants/currencies";
import toast from "react-hot-toast";
import { useLoaderData, useParams } from "react-router";
import { createTransaction } from "../services/api";
import Header from "../components/common/Header";
import { Currency, User } from "../types/types";

export default function DonatePage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>(
    CURRENCIES[0],
  );
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const user = useLoaderData() as User;

  const { donationSlug } = useParams();

  function resetForm() {
    setName("");
    setAmount("");
    setMessage("");
    setSelectedCurrency(CURRENCIES[0]);
  }

  async function submitTransaction() {
    const numAmount = Number(amount);
    const errors: string[] = [];

    if (!name.trim()) errors.push("Name is required");
    if (!numAmount || numAmount <= 0) errors.push("Amount is required");

    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      return;
    }

    const newTransaction = {
      amount: numAmount,
      currency: selectedCurrency.code,
      from: name,
      message,
      slug: donationSlug!,
    };

    try {
      await createTransaction(newTransaction);
      resetForm();
      toast.success("Donation has been sent");
    } catch {
      toast.error("Something went wrong, please try again");
    }
  }

  return (
    <>
      <title>Donate - Donathell</title>
      <Header />
      <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-3xl items-center justify-center px-3 pt-18 text-donathell-secondary sm:px-4">
        <div className="mb-10 flex min-h-120 w-full max-w-3xl flex-col items-center justify-center px-1">
          <div className="w-full bg-[#121315]  mb-2.5 rounded-3xl min-h-18 flex  items-center justify-center glass">
            <h2 className="font-bold text-3xl text-donathell-main">
              {user.username}
            </h2>
          </div>
          <div className="w-full bg-[#121315] py-4 px-6 rounded-t-3xl min-h-18 flex items-end justify-between gap-4  flex-wrap  glass">
            <DonationFormField
              label="Name"
              inputPlaceholder="Senya"
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
            <DonationFormField
              label="Amount"
              inputPlaceholder="200"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
            <CurrencySelect
              selectedCurrency={selectedCurrency}
              setSelectedCurrency={setSelectedCurrency}
            />
          </div>
          <textarea
            placeholder="Message..."
            className="w-full placeholder-[#c7ccc8a8] bg-[#121315] rounded-b-3xl resize-none h-64 px-6 py-4 focus:outline-none shadow-lg/30 glass-input"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <button
            className="self-stretch mt-3 rounded-2xl text-xl px-6 py-2 cursor-pointer duration-200 bg-donathell-main text-[#101115] hover:bg-[#32970d] font-bold glass-button"
            onClick={submitTransaction}
          >
            Submit
          </button>
        </div>
      </main>
    </>
  );
}
