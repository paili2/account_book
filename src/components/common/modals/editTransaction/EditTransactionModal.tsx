import { Transaction } from "@/src/components/transactions/TransactionsPage";
import EditTransactionForm from "./EditTransactionForm";
import { TransactionFormProps } from "../addTransaction/AddTransactionForm";

export interface EditTransactionModalProps extends TransactionFormProps {
  title: string;
  transaction: Transaction;
}

const EditTransactionModal = ({
  onSubmit,
  onChange,
  form,
  cancel,
  title,
  transaction,
}: EditTransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <EditTransactionForm
          onSubmit={onSubmit}
          onChange={onChange}
          form={form}
          cancel={cancel}
          transaction={transaction}
        ></EditTransactionForm>
      </div>
    </div>
  );
};

export default EditTransactionModal;
