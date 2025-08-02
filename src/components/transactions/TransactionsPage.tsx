"use client";

import { ChangeEvent, useEffect, useState } from "react";
import TableHeader from "./widgets/TableHeader";
import Header from "./widgets/Header";

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);

  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsChecked(new Array(transactions.length).fill(checked));
  };

  const handleIndividualCheck = (index: number) => {
    setIsChecked((prev) => {
      const updated = prev.map((v, i) => (i === index ? !v : v));
      setIsAllChecked(updated.every((v) => v));
      return updated;
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) return;
    const key = `transactions_${user.email}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    setTransactions(transactions);
    setIsChecked(new Array(transactions.length).fill(false));
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Header></Header>
      <section className="w-full max-w-4xl bg-white rounded-lg shadow">
        <TableHeader
          onChange={handleAllCheck}
          checked={isAllChecked}
        ></TableHeader>
        {transactions.length > 0 ? (
          transactions.map((v, i) => {
            const isIncome = v.type === "income";
            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] border-b border-gray-100 last:border-none py-3 text-gray-700 text-center p-6"
              >
                <input
                  type="checkbox"
                  className="mx-auto cursor-pointer"
                  checked={isChecked[i]}
                  onChange={() => handleIndividualCheck(i)}
                />
                <span>{v.item}</span>
                <span>
                  {isIncome
                    ? `+${Number(v.amount).toLocaleString()}원`
                    : `-${Number(v.amount).toLocaleString()}원`}
                </span>
                <span
                  className={`font-medium ${
                    isIncome ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {isIncome ? "수입" : "지출"}
                </span>
                <span>{v.date}</span>
              </div>
            );
          })
        ) : (
          <span className="block text-center py-6">등록된 내용이 없습니다</span>
        )}
      </section>
    </main>
  );
};

export default TransactionsPage;
