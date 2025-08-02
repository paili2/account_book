import { create } from "zustand";
import { User } from "@/src/components/dashboard/DashboardPage";
import { Transaction } from "@/src/components/transactions/TransactionsPage";

interface TransactionState {
  // ✅ 상태
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isDeleteModalOpen: boolean;
  isSelectionWarningModalOpen: boolean;
  user: User;
  form: Transaction;
  transactions: Transaction[];
  isAllChecked: boolean;
  isChecked: boolean[];

  // ✅ 액션
  setIsAddModalOpen: (open: boolean) => void;
  setIsEditModalOpen: (open: boolean) => void;
  setIsDeleteModalOpen: (open: boolean) => void;
  setIsSelectionWarningModalOpen: (open: boolean) => void;
  setUser: (user: User) => void;
  setForm: (form: Transaction) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setIsAllChecked: (value: boolean) => void;
  setIsChecked: (value: boolean[]) => void;
  resetForm: () => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  isAddModalOpen: false,
  isEditModalOpen: false,
  isDeleteModalOpen: false,
  isSelectionWarningModalOpen: false,
  user: {},
  form: {
    id: "",
    item: "",
    amount: "",
    type: "income",
    date: new Date().toLocaleDateString(),
  },
  transactions: [],
  isAllChecked: false,
  isChecked: [],

  // ✅ 액션 구현
  setIsAddModalOpen: (open) => set({ isAddModalOpen: open }),
  setIsEditModalOpen: (open) => set({ isEditModalOpen: open }),
  setIsDeleteModalOpen: (open) => set({ isDeleteModalOpen: open }),
  setIsSelectionWarningModalOpen: (open) =>
    set({ isSelectionWarningModalOpen: open }),
  setUser: (user) => set({ user }),
  setForm: (form) => set({ form }),
  setTransactions: (transactions) => set({ transactions }),
  setIsAllChecked: (value) => set({ isAllChecked: value }),
  setIsChecked: (value) => set({ isChecked: value }),
  resetForm: () =>
    set({
      form: {
        id: "",
        item: "",
        amount: "",
        type: "income",
        date: new Date().toLocaleDateString(),
      },
    }),
}));
