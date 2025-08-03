"use client";

import { useEffect, useMemo, useState } from "react";
import TableHeader from "./widgets/TableHeader";
import Header from "./widgets/Header";
import { User } from "../dashboard/DashboardPage";
import { useRouter } from "next/navigation";
import {
  handleAllCheck,
  handleIndividualCheck,
} from "@/src/lib/utils/handleCheck";
import { getModals } from "@/src/lib/utils/modalConfig";
import toggleModal from "@/src/lib/utils/toggleModal";

export interface Transaction extends Record<string, unknown> {
  id: string;
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
  const [form, setForm] = useState<Transaction>({
    id: "",
    item: "",
    amount: "",
    type: "income",
    date: new Date().toLocaleDateString(),
  });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean[]>([]);
  const [editCheckCount, setEditCheckCount] = useState(0);
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  const router = useRouter();

  const resetSelection = (length = transactions.length) => {
    setIsAllChecked(false);
    setIsChecked(Array(length).fill(false));
  };

  const storageKey = user.email ? `transactions_${user.email}` : "";

  const handleDeleteSubmitTransaction = () => {
    const updated = transactions.filter((_, i) => !isChecked[i]);
    setTransactions(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    resetSelection(updated.length);
    toggleModal(setIsDeleteModalOpen);
  };

  const validateDeleteSelection = () => {
    const selectedCount = isChecked.filter(Boolean).length;
    const totalCount = transactions.length;

    if (selectedCount < 1) {
      setDeleteMessage("삭제할 항목을 선택해주세요");
      setIsSelectionWarningModalOpen(true);
    } else if (
      isAllChecked ||
      (selectedCount === totalCount && totalCount > 0)
    ) {
      setDeleteMessage("전체 삭제하시겠습니까?");
      setTimeout(() => setIsDeleteModalOpen(true), 50);
    } else {
      setDeleteMessage("선택한 항목을 삭제하시겠습니까?");
      setTimeout(() => setIsDeleteModalOpen(true), 50);
    }
  };

  useEffect(() => {
    if (
      deleteMessage === "전체 삭제하시겠습니까?" ||
      deleteMessage === "선택한 항목을 삭제하시겠습니까?"
    ) {
      setIsDeleteModalOpen(true);
    }
  }, [deleteMessage]);

  const cancelModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter(false);
    resetSelection(transactions.length);
  };

  const modals = useMemo(
    () =>
      getModals({
        isAddModalOpen,
        isEditModalOpen,
        isSelectionWarningModalOpen,
        isDeleteModalOpen,
        editCheckCount,
        transaction: transactions.find((_, i) => isChecked[i]),
        setIsAllChecked,
        setIsChecked,
        transactions,
        user,
        form,
        setForm,
        setTransactions,
        setIsAddModalOpen,
        setIsEditModalOpen,
        setIsDeleteModalOpen,
        setIsSelectionWarningModalOpen,
        handleDeleteSubmitTransaction,
        cancelModal,
        deleteMessage,
      }),
    [
      isAddModalOpen,
      isEditModalOpen,
      isSelectionWarningModalOpen,
      isDeleteModalOpen,
      editCheckCount,
      transactions,
      isChecked,
      user,
      form,
      deleteMessage,
    ]
  );

  useEffect(() => {
    const loadTransactions = () => {
      const storedUser = JSON.parse(
        localStorage.getItem("loggedInUser") || "null"
      );
      if (!storedUser) {
        router.push("/login");
        return;
      }
      setUser(storedUser);

      const key = `transactions_${storedUser.email}`;
      const savedTransactions = JSON.parse(localStorage.getItem(key) || "[]");
      setTransactions(savedTransactions.reverse());
      resetSelection(savedTransactions.length);
    };

    loadTransactions();
  }, []);

  const validateSingleSelection = () => {
    const selectedCount = isChecked.filter(Boolean).length;
    setEditCheckCount(selectedCount);

    if (selectedCount !== 1) {
      toggleModal(setIsSelectionWarningModalOpen);
    } else {
      setForm(transactions[isChecked.findIndex(Boolean)]);
      toggleModal(setIsEditModalOpen);
    }
  };

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "income")
        .reduce((acc, cur) => acc + Number(cur.amount), 0),
    [transactions]
  );

  const totalExpense = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "expense")
        .reduce((acc, cur) => acc + Number(cur.amount), 0),
    [transactions]
  );

  const balance = totalIncome - totalExpense;

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <Header
        addClick={() => toggleModal(setIsAddModalOpen)}
        editClick={validateSingleSelection}
        deleteClick={validateDeleteSelection}
      />
      <div className="w-full max-w-4xl flex flex-col gap-[20px]">
        <section className="w-full max-w-4xl bg-white rounded-lg shadow mb-4 p-4 grid grid-cols-3 text-center text-gray-700">
          <div>
            <p className="font-semibold">총 수입</p>
            <p className="text-blue-500 font-bold">
              {totalIncome.toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="font-semibold">총 지출</p>
            <p className="text-red-500 font-bold">
              {totalExpense.toLocaleString()}원
            </p>
          </div>
          <div>
            <p className="font-semibold">잔액</p>
            <p
              className={`font-bold ${
                balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {balance.toLocaleString()}원
            </p>
          </div>
        </section>
        <section className="w-full max-w-4xl bg-white rounded-lg shadow">
          <TableHeader
            onChange={(e) =>
              handleAllCheck(e, setIsAllChecked, setIsChecked, transactions)
            }
            checked={isAllChecked}
          />
          {transactions.length > 0 ? (
            transactions.map((v, i) => {
              const isIncome = v.type === "income";
              return (
                <div
                  key={v.id || i} // ✅ 유니크 보장
                  className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr] border-b border-gray-100 last:border-none py-3 text-gray-700 text-center p-6"
                >
                  <input
                    type="checkbox"
                    className="mx-auto cursor-pointer"
                    checked={isChecked[i] ?? false}
                    onChange={() =>
                      handleIndividualCheck(i, setIsAllChecked, setIsChecked)
                    }
                  />
                  <span>{v.item}</span>
                  <span>{`${isIncome ? "+" : "-"}${Number(
                    v.amount
                  ).toLocaleString()}원`}</span>
                  <span
                    className={`font-medium ${
                      isIncome ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {isIncome ? "수입" : "지출"}
                  </span>
                  <span>{new Date(v.date).toLocaleDateString()}</span>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 py-4">
              내역이 없습니다.
            </div>
          )}
        </section>
      </div>

      {modals.map(({ key, condition, Component, props }) =>
        condition ? <Component key={key} {...props} /> : null
      )}
    </main>
  );
};

export default TransactionsPage;
