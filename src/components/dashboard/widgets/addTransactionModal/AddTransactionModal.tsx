import { ChangeEvent, FormEvent } from "react";
import TransactionForm, { TransactionFormProps } from "./TransactionForm";

const AddTransactionModal = ({
  onSubmit,
  onChange,
  form,
  cancel,
}: TransactionFormProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">새 거래 추가</h2>
        <TransactionForm
          onSubmit={onSubmit}
          onChange={onChange}
          form={form}
          cancel={cancel}
        ></TransactionForm>
      </div>
    </div>
  );
};

export default AddTransactionModal;
