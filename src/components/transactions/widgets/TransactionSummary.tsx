interface TransactionSummaryProps {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const TransactionSummary = ({
  totalIncome,
  totalExpense,
  balance,
}: TransactionSummaryProps) => {
  return (
    <section className="w-full max-w-4xl bg-white rounded-lg shadow mb-4 p-4 grid grid-cols-3 text-center text-gray-700">
      <div>
        <p className="font-semibold">총 수입</p>
        <p className="text-blue-500 font-bold">
          {totalIncome.toLocaleString()}원
        </p>
      </div>
      <div>
        <p className="font-semibold">총 지출</p>
        <p className="text-red-500 font-bold">
          {totalExpense.toLocaleString()}원
        </p>
      </div>
      <div>
        <p className="font-semibold">잔액</p>
        <p
          className={`font-bold ${
            balance >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {balance.toLocaleString()}원
        </p>
      </div>
    </section>
  );
};

export default TransactionSummary;
