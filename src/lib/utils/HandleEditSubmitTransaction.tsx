import { User } from "@/src/components/dashboard/DashboardPage";
import { Transaction } from "@/src/components/transactions/TransactionsPage";
import ToggleModal from "./ToggleModal";

export const HandleEditSubmitTransaction = (
  e: React.FormEvent,
  user: User,
  form: Transaction,
  transactions: Transaction[],
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setisAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  e.preventDefault();

  const key = `transactions_${user.email}`;

  const updated = transactions.map((t) =>
    t.id === form.id ? { ...t, ...form } : t
  );

  localStorage.setItem(key, JSON.stringify(updated));
  setTransactions(updated);
  ToggleModal(setIsEditModalOpen);
  setisAllChecked(false);
  setIsChecked(new Array(transactions.length).fill(false));
};
