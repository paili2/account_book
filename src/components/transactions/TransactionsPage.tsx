"use client";

import { ChangeEvent, useEffect, useState } from "react";
import TableHeader from "./widgets/TableHeader";
import Header from "./widgets/Header";
import AddTransactionModal from "../common/widgets/addTransactionModal/AddTransactionModal";
import HandleInputChange from "@/src/lib/utils/HandleInputChange";
import ToggleModal from "@/src/lib/utils/ToggleModal";
import { User } from "../dashboard/DashboardPage";
import { HandleSubmitTransaction } from "@/src/lib/utils/HandleSubmitTransaction";
import { useRouter } from "next/navigation";
import EditTransactionModal from "../common/widgets/editTransactionModal.tsx/modal/EditTransactionModal";
import DeleteTransactionModal from "../common/widgets/deleteTransactionModal/DeleteTransactionModal";
import SingleSelectionAlertModal from "../common/widgets/editTransactionModal.tsx/modal/SingleSelectionAlertModal";

export interface Transaction {
  item: string;
  amount: string;
  type: "income" | "expense";
  date: string;
}

const TransactionsPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectionWarningModalOpen, setIsSelectionWarningModalOpen] =
    useState(false);
  const [user, setUser] = useState<User>({});
  const [form, setForm] = useState({
    item: "",
    amount: "",
    type: "income",
    date: "",
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const router = useRouter();

  const handleAllCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsAllChecked(checked);
    setIsChecked(new Array(transactions.length).fill(checked));
  };

  const handleIndividualCheck = (index: number) => {
    setIsChecked((prev) => {
      const updated = prev.map((v, i) => (i === index ? !v : v));
      setIsAllChecked(updated.every((v) => v));
      return updated;
    });
  };

  const transaction = transactions.find((v, i) => isChecked[i]);

  const handleDelete = () => {
    const updated = transactions.filter((v, i) => !isChecked[i]);
    setTransactions(updated);
    setIsChecked(Array(updated.length).fill(false));
    const key = `transactions_${user.email}`;
    localStorage.setItem(key, JSON.stringify(updated));
    setIsChecked(Array(updated.length).fill(false));
    ToggleModal(setIsDeleteModalOpen);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    if (!user) router.push("/login");
    else setUser(user);

    const key = `transactions_${user.email}`;
    const transactions = JSON.parse(localStorage.getItem(key) || "[]");
    setTransactions(transactions.reverse());
    setIsChecked(Array(transactions.length).fill(false));
  }, []);

  const editCheck = isChecked?.filter((v) => v === true);
  const validateSingleSelection = () => {
    if (editCheck.length !== 1) {
      ToggleModal(setIsSelectionWarningModalOpen);
    } else {
      ToggleModal(setIsEditModalOpen);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Header
        addClick={() => ToggleModal(setIsAddModalOpen)}
        editClick={validateSingleSelection}
        deleteClick={() => ToggleModal(setIsDeleteModalOpen)}
      />
      <section className="w-full max-w-4xl bg-white rounded-lg shadow">
        <TableHeader onChange={handleAllCheck} checked={isAllChecked} />
        {transactions.length > 0 ? (
          transactions.map((v, i) => {
            const isIncome = v.type === "income";
            return (
              <div
                key={i}
                className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] border-b border-gray-100 last:border-none py-3 text-gray-700 text-center p-6"
              >
                <input
                  type="checkbox"
                  className="mx-auto cursor-pointer"
                  checked={isChecked[i] ?? false}
                  onChange={() => handleIndividualCheck(i)}
                />
                <span>{v.item}</span>
                <span>
                  {isIncome
                    ? `+${Number(v.amount).toLocaleString()}원`
                    : `-${Number(v.amount).toLocaleString()}원`}
                </span>
                <span
                  className={`font-medium ${
                    isIncome ? "text-blue-500" : "text-red-500"
                  }`}
                >
                  {isIncome ? "수입" : "지출"}
                </span>
                <span>{v.date}</span>
              </div>
            );
          })
        ) : (
          <span className="block text-center py-6">등록된 내용이 없습니다</span>
        )}
      </section>
      {isAddModalOpen && (
        <AddTransactionModal
          onSubmit={(e) => HandleSubmitTransaction(e, user, form)}
          onChange={(e) => HandleInputChange(e, setForm)}
          form={form}
          cancel={() => ToggleModal(setIsAddModalOpen)}
        ></AddTransactionModal>
      )}
      {isEditModalOpen && transaction && (
        <EditTransactionModal
          title="내역 수정"
          onSubmit={(e) => HandleSubmitTransaction(e, user, form)}
          onChange={(e) => HandleInputChange(e, setForm)}
          form={form}
          cancel={() => ToggleModal(setIsEditModalOpen)}
          transaction={transaction}
        ></EditTransactionModal>
      )}
      {isSelectionWarningModalOpen && (
        <>
          {editCheck.length > 1 ? (
            <SingleSelectionAlertModal
              message="항목을 하나만 선택해주세요"
              confirm={() => ToggleModal(setIsSelectionWarningModalOpen)}
            />
          ) : (
            <SingleSelectionAlertModal
              message="항목을 하나 이상 선택해주세요"
              confirm={() => ToggleModal(setIsSelectionWarningModalOpen)}
            />
          )}
        </>
      )}

      {isDeleteModalOpen && (
        <DeleteTransactionModal
          deleteClick={handleDelete}
          cancel={() => ToggleModal(setIsDeleteModalOpen)}
        ></DeleteTransactionModal>
      )}
    </main>
  );
};

export default TransactionsPage;
