import AddTransactionButton, {
  AddTransactionButtonProps,
} from "./AddTransactionButton";
import ViewTransactionsButton from "./ViewTransactionsButton";

interface TransactionActionsProps {
  addTransaction: () => void;
}

const TransactionActions = ({ addTransaction }: TransactionActionsProps) => {
  return (
    <div className="w-full max-w-2xl flex gap-4 mt-6">
      <AddTransactionButton onClick={addTransaction}></AddTransactionButton>
      <ViewTransactionsButton></ViewTransactionsButton>
    </div>
  );
};

export default TransactionActions;
