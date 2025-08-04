import { ChangeEvent, FormEvent } from "react";
import Button from "../../ui/Button";
import { inputFields } from "../InputField";

export interface TransactionFormProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void;
  form: { item: string; amount: string; type: string };
  cancel: () => void;
}

const AddTransactionForm = ({
  onSubmit,
  onChange,
  form,
  cancel,
}: TransactionFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {inputFields.map((v, i) => (
        <input
          key={i}
          type={v.type}
          name={v.name}
          onChange={onChange}
          placeholder={v.placeholder}
          className="w-full border rounded p-2 mb-3"
        />
      ))}
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
        <Button type="submit" text="등록"></Button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
