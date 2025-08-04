import { useEffect, useState } from "react";
import TransactionAmount from "./TransactionAmount";
import { User } from "../../../dashboard/DashboardPage";
import { Transaction } from "@/src/components/transactions/TransactionsPage";
import Title from "../../ui/Title";

const RecentTransactions = () => {
  const [transactions, settTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "[]");
    const key = `transactions_${user.email}`;
    setUser(user);
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    settTransactions(transactions);
  }, []);

  return (
    <section className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mt-6">
      <Title variant="h3" className="mb-4">
        최근 거래 내역
      </Title>
      <ul className="space-y-3">
        {transactions
          .slice(-7)
          .reverse()
          .map((v, i) => (
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
