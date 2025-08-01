"use client";

import { useRouter } from "next/navigation";

const TransactionsPage = () => {
  const router = useRouter();

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
      <section className="w-full max-w-4xl bg-white rounded-lg shadow p-6">
        <div className="flex justify-between mb-4 font-semibold text-gray-600 border-b pb-2">
          <span>항목</span>
          <span>금액</span>
          <span>타입</span>
          <span>날짜</span>
        </div>

        {/* 거래 아이템 (반복될 부분) */}
        <div className="flex justify-between py-3 border-b last:border-none text-gray-700">
          <span>점심 식사</span>
          <span>-12,000원</span>
          <span className="text-red-500 font-medium">지출</span>
          <span>2025-08-01</span>
        </div>
        <div className="flex justify-between py-3 border-b last:border-none text-gray-700">
          <span>급여</span>
          <span>+2,000,000원</span>
          <span className="text-green-500 font-medium">수입</span>
          <span>2025-08-01</span>
        </div>
      </section>
    </main>
  );
};

export default TransactionsPage;
