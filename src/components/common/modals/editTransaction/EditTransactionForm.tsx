import { Transaction } from "@/src/components/transactions/TransactionsPage";
import { TransactionFormProps } from "../addTransaction/AddTransactionForm";
import Button from "../../ui/Button";

export interface EditTransactionFormProps extends TransactionFormProps {
  transaction: Transaction;
}

const EditTransactionForm = ({
  onSubmit,
  onChange,
  form,
  cancel,
}: EditTransactionFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="item"
        onChange={onChange}
        placeholder="항목명"
        value={form.item}
        className="w-full border rounded p-2 mb-3"
      />
      <input
        type="number"
        name="amount"
        placeholder="금액"
        value={form.amount}
        onChange={onChange}
        className="w-full border rounded p-2 mb-3"
      />
      <select
        name="type"
        value={form.type}
        onChange={onChange}
        className="w-full border rounded p-2 mb-3"
      >
        <option value="income">수입</option>
        <option value="expense">지출</option>
      </select>
      <div className="flex justify-end gap-2">
        <Button onClick={cancel} text="취소"></Button>
        <Button type="submit" text="완료"></Button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
