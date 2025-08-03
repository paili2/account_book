import { User } from "@/src/components/dashboard/DashboardPage";
import { Transaction } from "@/src/components/transactions/TransactionsPage";
import toggleModal from "./toggleModal";

export const HandleAddSubmitTransaction = (
  e: React.FormEvent,
  user: User,
  form: Transaction,
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  e.preventDefault();

  // ✅ 항목 미입력 체크
  if (!form.item.trim()) {
    alert("항목을 입력하세요.");
    return;
  }

  // ✅ 금액 미입력 체크
  if (!form.amount.toString().trim()) {
    alert("금액을 입력하세요.");
    return;
  }

  const key = `transactions_${user.email}`;
  const stored = JSON.parse(localStorage.getItem(key) || "[]");

  const newTransaction = {
    ...form,
    id: crypto.randomUUID(), // ✅ 유니크 id 생성
  };
  const updated = [...stored, newTransaction];

  localStorage.setItem(key, JSON.stringify(updated));
  setTransactions([...updated].reverse());

  toggleModal(setIsAddModalOpen);
};
