import { User } from "@/src/components/dashboard/DashboardPage";
import { FormEvent } from "react";

export const HandleSubmitTransaction = (
  e: FormEvent<HTMLFormElement>,
  user: User,
  form: {
    item: string;
    amount: string;
    type: string;
    date: string;
  }
) => {
  const key = `transactions_${user.email}`;
  const transactions = JSON.parse(localStorage.getItem(key) || "[]");
  transactions.push({ ...form, date: new Date().toLocaleDateString() });
  localStorage.setItem(key, JSON.stringify(transactions));
};
