import AddTransactionModal from "@/src/components/common/modals/addTransaction/AddTransactionModal";
import DeleteTransactionModal from "@/src/components/common/modals/deleteTransaction/DeleteTransactionModal";
import EditTransactionModal from "@/src/components/common/modals/editTransaction/EditTransactionModal";
import SingleSelectionAlertModal from "@/src/components/common/modals/editTransaction/SingleSelectionAlertModal";
import { HandleAddSubmitTransaction } from "@/src/lib/utils/HandleAddSubmitTransaction";
import { HandleEditSubmitTransaction } from "@/src/lib/utils/HandleEditSubmitTransaction";
import HandleInputChange from "@/src/lib/utils/HandleInputChange";
import { ComponentType } from "react";

interface ModalConfig {
  condition: boolean;
  Component: ComponentType<any>;
  props: Record<string, any>;
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
}: any): ModalConfig[] => [
  {
    condition: isAddModalOpen,
    Component: AddTransactionModal,
    props: {
      setIsAllChecked,
      setIsChecked,
      transactions,
      onSubmit: (e: any) =>
        HandleAddSubmitTransaction(
          e,
          user,
          form,
          setTransactions,
          setIsAddModalOpen
        ),
      onChange: (e: any) => HandleInputChange(e, setForm),
      form,
      cancel: () => cancelModal(setIsAddModalOpen),
    },
  },
  {
    condition: isEditModalOpen && transaction,
    Component: EditTransactionModal,
    props: {
      title: "내역 수정",
      onSubmit: (e: any) =>
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
      onChange: (e: any) => HandleInputChange(e, setForm),
      form,
      transaction,
      cancel: () => cancelModal(setIsEditModalOpen),
    },
  },
  {
    condition: isSelectionWarningModalOpen,
    Component: SingleSelectionAlertModal,
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
    condition: isDeleteModalOpen,
    Component: DeleteTransactionModal,
    props: {
      deleteMessage, // ✅ 메시지 전달
      deleteClick: handleDeleteSubmitTransaction,
      cancel: () => cancelModal(setIsDeleteModalOpen),
    },
  },
];
