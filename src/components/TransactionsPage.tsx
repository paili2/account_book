"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TransactionsPage = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) return;
    const key = `transactions_${user.email}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    setTransactions(transactions);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* 헤더 */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">거래 내역</h1>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          대시보드로
        </button>
      </header>

      {/* 거래 내역 리스트 */}
      <section className="w-full max-w-4xl bg-white rounded-lg shadow">
        {/* 헤더 */}
        <div className="grid grid-cols-[1fr_2fr_1fr_1fr] font-semibold bg-gray-100 py-5 px-6">
          <span className="text-center">항목</span>
          <span className="text-center">금액</span>
          <span className="text-center">타입</span>
          <span className="text-center">날짜</span>
        </div>

        {/* 거래 아이템 */}
        {transactions.length > 0 ? (
          transactions.map((v, i) => {
            const isIncome = v.type === "income";
            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr_1fr_1fr] border-b border-gray-100 last:border-none py-3 text-gray-700 text-center p-6"
              >
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
