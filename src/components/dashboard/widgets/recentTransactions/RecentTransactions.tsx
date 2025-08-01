import { useEffect, useState } from "react";
import TransactionAmount from "./TransactionAmount";

const RecentTransactions = () => {
  const [transactions, settTransactions] = useState<any[]>([]);

  useEffect(() => {
    const transactions = JSON.parse(
      localStorage.getItem("transactions") || "[]"
    );
    settTransactions(transactions);
  }, []);

  return (
    <section className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        최근 거래 내역
      </h3>
      <ul className="space-y-3">
        {transactions.map((v, i) => (
          <TransactionAmount
            item={v.item}
            amount={v.amount}
            type={v.type}
            key={i}
          ></TransactionAmount>
        ))}
      </ul>
    </section>
  );
};

export default RecentTransactions;
