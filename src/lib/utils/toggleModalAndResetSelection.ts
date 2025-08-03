import { Transaction } from "@/src/components/transactions/TransactionsPage";
import toggleModal from "./toggleModal";

export const toggleModalAndResetSelection = (
  modalOpenType: React.Dispatch<React.SetStateAction<boolean>>,
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>,
  transactions: Transaction[]
) => {
  toggleModal(modalOpenType);
  setIsAllChecked(false);
  setIsChecked(new Array(transactions.length).fill(false));
};
