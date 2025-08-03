"use client";

import AddTransactionModal from "@/src/components/common/modals/addTransaction/AddTransactionModal";
import DeleteTransactionModal from "@/src/components/common/modals/deleteTransaction/DeleteTransactionModal";
import EditTransactionModal from "@/src/components/common/modals/editTransaction/EditTransactionModal";
import SingleSelectionAlertModal from "@/src/components/common/modals/editTransaction/SingleSelectionAlertModal";
import { HandleAddSubmitTransaction } from "@/src/lib/utils/HandleAddSubmitTransaction";
import { HandleEditSubmitTransaction } from "@/src/lib/utils/HandleEditSubmitTransaction";
import HandleInputChange from "@/src/lib/utils/HandleInputChange";
import { Transaction } from "@/src/components/transactions/TransactionsPage";
import { User } from "@/src/components/dashboard/DashboardPage";
import { ComponentType } from "react";

interface BaseModalProps {
  cancel?: () => void;
  onSubmit?: (e: React.FormEvent) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form?: Transaction;
  setIsAllChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked?: React.Dispatch<React.SetStateAction<boolean[]>>;
  transactions?: Transaction[];
  title?: string;
  transaction?: Transaction;
  deleteMessage?: string;
  deleteClick?: () => void;
  message?: string;
  confirm?: () => void;
}

export interface ModalConfig<T extends BaseModalProps = BaseModalProps> {
  key: string;
  condition: boolean;
  Component: ComponentType<T>;
  props: T;
}

interface GetModalsProps {
  isAddModalOpen: boolean;
  isEditModalOpen: boolean;
  isSelectionWarningModalOpen: boolean;
  isDeleteModalOpen: boolean;
  editCheckCount: number;
  transaction: Transaction | undefined;
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>;
  transactions: Transaction[];
  user: User;
  form: Transaction;
  setForm: React.Dispatch<React.SetStateAction<Transaction>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectionWarningModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteSubmitTransaction: () => void;
  cancelModal: (setter: React.Dispatch<React.SetStateAction<boolean>>) => void;
  deleteMessage: string;
}

export const getModals = ({
  isAddModalOpen,
  isEditModalOpen,
  isSelectionWarningModalOpen,
  isDeleteModalOpen,
  editCheckCount,
  transaction,
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
}: GetModalsProps): ModalConfig[] => [
  {
    key: "addTransaction",
    condition: isAddModalOpen,
    Component: AddTransactionModal as ComponentType<BaseModalProps>,
    props: {
      setIsAllChecked,
      setIsChecked,
      transactions,
      onSubmit: (e: React.FormEvent) =>
        HandleAddSubmitTransaction(
          e,
          user,
          form,
          setTransactions,
          setIsAddModalOpen
        ),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        HandleInputChange<Transaction>(e, setForm),
      form,
      cancel: () => cancelModal(setIsAddModalOpen),
    },
  },
  {
    key: "editTransaction",
    condition: isEditModalOpen && !!transaction,
    Component: EditTransactionModal as ComponentType<BaseModalProps>,
    props: {
      title: "내역 수정",
      onSubmit: (e: React.FormEvent) =>
        HandleEditSubmitTransaction(
          e,
          user,
          form,
          transactions,
          setTransactions,
          setIsEditModalOpen,
          setIsAllChecked,
          setIsChecked
        ),
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        HandleInputChange<Transaction>(e, setForm),
      form,
      transaction,
      cancel: () => cancelModal(setIsEditModalOpen),
    },
  },
  {
    key: "selectionWarning",
    condition: isSelectionWarningModalOpen,
    Component: SingleSelectionAlertModal as ComponentType<BaseModalProps>,
    props: {
      message:
        editCheckCount > 1
          ? "항목을 하나만 선택해주세요"
          : "항목을 하나 이상 선택해주세요",
      confirm: () => {
        setIsSelectionWarningModalOpen(false);
        if (editCheckCount > 1) {
          setIsAllChecked(false);
          setIsChecked(new Array(transactions.length).fill(false));
        }
      },
    },
  },
  {
    key: "deleteTransaction",
    condition: isDeleteModalOpen,
    Component: DeleteTransactionModal as ComponentType<BaseModalProps>,
    props: {
      deleteMessage,
      deleteClick: handleDeleteSubmitTransaction,
      cancel: () => cancelModal(setIsDeleteModalOpen),
    },
  },
];
