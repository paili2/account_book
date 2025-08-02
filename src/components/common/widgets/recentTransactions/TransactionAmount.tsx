interface TransactionAmountProps {
  item: string;
  amount: string;
  type: string;
}

const TransactionAmount = ({ item, amount, type }: TransactionAmountProps) => {
  return (
    <li className="flex justify-between border-b pb-2">
      <span className="text-gray-600">{item}</span>
      <span
        className={`text-blue-500 font-medium ${
          type === "income" ? "text-blue-500" : "text-red-500"
        }`}
      >
        {type === "income" ? "+" : "-"}
        {amount}
      </span>
    </li>
  );
};

export default TransactionAmount;
