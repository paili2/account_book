import { Transaction } from "@/src/components/transactions/TransactionsPage";
import AddTransactionForm, { TransactionFormProps } from "./AddTransactionForm";

interface AddTransactionModalProps extends TransactionFormProps {
  cancel: () => void;
  // setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  // setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  // transactions: Transaction[];
}

const AddTransactionModal = ({
  onSubmit,
  onChange,
  form,
  cancel,
}: AddTransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">새 거래 추가</h2>
        <AddTransactionForm
          onSubmit={onSubmit}
          onChange={onChange}
          form={form}
          cancel={cancel}
        ></AddTransactionForm>
      </div>
    </div>
  );
};

export default AddTransactionModal;
