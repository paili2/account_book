import { useEffect, useState } from "react";
import TransactionAmount from "./TransactionAmount";
import { User } from "../../DashboardPage";

const RecentTransactions = () => {
  const [transactions, settTransactions] = useState<any[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
    const key = `transactions_${user.email}`;
    setUser(user);
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    settTransactions(transactions.reverse());
  }, []);

  return (
    <section className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        최근 거래 내역
      </h3>
      <ul className="space-y-3">
        {transactions.slice(0, 7).map((v, i) => (
          <TransactionAmount
            item={v.item}
            amount={Number(v.amount).toLocaleString()}
            type={v.type}
            key={i}
          ></TransactionAmount>
        ))}
      </ul>
    </section>
  );
};

export default RecentTransactions;
