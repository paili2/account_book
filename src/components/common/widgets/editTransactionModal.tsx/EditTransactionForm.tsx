import { Transaction } from "@/src/components/transactions/TransactionsPage";
import { ChangeEvent, FormEvent } from "react";
import { TransactionFormProps } from "../addTransactionModal/TransactionForm";

export interface EditTransactionFormProps extends TransactionFormProps {
  transaction: Transaction;
}

const EditTransactionForm = ({
  onSubmit,
  onChange,
  form,
  cancel,
  transaction,
}: EditTransactionFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="item"
        onChange={onChange}
        placeholder="항목명"
        value={transaction.item}
        className="w-full border rounded p-2 mb-3"
      />
      <input
        type="number"
        name="amount"
        placeholder="금액"
        value={transaction.amount}
        onChange={onChange}
        className="w-full border rounded p-2 mb-3"
      />
      <select
        name="type"
        value={transaction.type}
        onChange={onChange}
        className="w-full border rounded p-2 mb-3"
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
      <div className="flex justify-end gap-2">
        <button
          onClick={cancel}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 cursor-pointer"
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer"
        >
          등록
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
