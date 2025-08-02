import { Transaction } from "@/src/components/transactions/TransactionsPage";
import ToggleModal from "./ToggleModal";

export const toggleModalAndResetSelection = (
  modalOpenType: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>,
  transactions: Transaction[]
) => {
  ToggleModal(modalOpenType);
  setIsAllChecked(false);
  setIsChecked(new Array(transactions.length).fill(false));
};
