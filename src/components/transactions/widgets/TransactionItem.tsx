interface TransactionItemProps {
  checked: boolean;
  onChange: () => void;
  item: string;
  amount: string;
  isIncome: boolean;
  date: string;
}

const TransactionItem = ({
  checked,
  onChange,
  item,
  amount,
  isIncome,
  date,
}: TransactionItemProps) => {
  return (
    <div className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] border-b border-gray-100 last:border-none py-3 text-gray-700 text-center p-6">
      <input
        type="checkbox"
        className="mx-auto cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      <span>{item}</span>
      <span>{`${isIncome ? "+" : "-"}${Number(
        amount
      ).toLocaleString()}원`}</span>
      <span
        className={`font-medium ${isIncome ? "text-blue-500" : "text-red-500"}`}
      >
        {isIncome ? "수입" : "지출"}
      </span>
      <span>{new Date(date).toLocaleDateString()}</span>
    </div>
  );
};

export default TransactionItem;
