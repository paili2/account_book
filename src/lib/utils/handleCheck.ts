import { Transaction } from "@/src/components/transactions/TransactionsPage";
import { ChangeEvent } from "react";

export const handleAllCheck = (
  e: ChangeEvent<HTMLInputElement>,
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>,
  transactions: Transaction[]
) => {
  const checked = e.target.checked;
  setIsAllChecked(checked);
  setIsChecked(() => {
    const newArr = Array(transactions.length).fill(checked);
    return newArr;
  });
};

export const handleIndividualCheck = (
  index: number,
  setIsAllChecked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsChecked: React.Dispatch<React.SetStateAction<boolean[]>>
) => {
  setIsChecked((prev) => {
    const updated = prev.map((v, i) => (i === index ? !v : v));
    setIsAllChecked(updated.every((v) => v));
    return updated;
  });
};
