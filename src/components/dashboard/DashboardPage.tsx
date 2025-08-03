"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Header from "../common/widgets/header/Header";
import UserGreeting from "../common/widgets/UserGreeting";
import TransactionActions from "../common/widgets/transactionActions/TransactionActions";
import RecentTransactions from "../common/widgets/recentTransactions/RecentTransactions";
import AddTransactionModal from "../common/modals/addTransaction/AddTransactionModal";
import HandleInputChange from "@/src/lib/utils/HandleInputChange";
import toggleModal from "@/src/lib/utils/toggleModal";

export interface User {
  nickName?: string;
  email?: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChecking, setIsChecking] = useState(true); // ✅ 로딩 상태 추가

  const [form, setForm] = useState({
    item: "",
    amount: "",
    type: "income",
    date: "",
  });

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("loggedInUser");
    setUser({});
    router.push("/login");
  };

  const handleSubmitTransaction = (e: FormEvent<HTMLFormElement>) => {
    const key = `transactions_${user.email}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    transactions.push({ ...form, date: new Date().toLocaleDateString() });
    localStorage.setItem(key, JSON.stringify(transactions));
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) {
      router.replace("/login");
    } else {
      setUser(user);
    }
    setIsChecking(false);
  }, []);

  if (isChecking) return null;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Header onClick={logout}></Header>
      <UserGreeting user={user}></UserGreeting>
      <TransactionActions
        addTransaction={() => toggleModal(setIsModalOpen)}
      ></TransactionActions>
      <RecentTransactions></RecentTransactions>
      {isModalOpen && (
        <AddTransactionModal
          onSubmit={handleSubmitTransaction}
          onChange={(e) => HandleInputChange(e, setForm)}
          form={form}
          cancel={() => toggleModal(setIsModalOpen)}
        ></AddTransactionModal>
      )}
    </main>
  );
};

export default DashboardPage;
