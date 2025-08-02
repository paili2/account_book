import { ChangeEvent } from "react";
import { Transaction } from "../TransactionsPage";

interface TableHeaderProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const TableHeader = ({ onChange, checked }: TableHeaderProps) => {
  const column: string[] = ["선택", "항목", "금액", "타입", "날짜"];

  return (
    <div className="grid grid-cols-[1fr_2fr_3fr_2fr_2fr]  font-semibold bg-gray-100 py-5 px-6">
      {column.map((v, i) =>
        i === 0 ? (
          <div key={i} className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={checked}
              onChange={onChange}
              className="mx-auto w-4 h-4 cursor-pointer"
            />
          </div>
        ) : (
          <span key={i} className="text-center">
            {v}
          </span>
        )
      )}
    </div>
  );
};

export default TableHeader;
