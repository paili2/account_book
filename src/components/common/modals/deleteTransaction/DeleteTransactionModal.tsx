"use client";

import { X } from "lucide-react";

interface DeleteTransactionModalProps {
  deleteMessage: string; // ✅ 메시지 prop 추가
  deleteClick: () => void;
  cancel: () => void;
}

const DeleteTransactionModal = ({
  deleteMessage,
  deleteClick,
  cancel,
}: DeleteTransactionModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-96 shadow-2xl border-b border-gray-100">
        <div className="w-full bg-blue-500 rounded-t-xl flex justify-end items-center pr-3 py-2">
          <button
            onClick={cancel}
            className="text-gray-300 hover:text-black flex justify-end items-center transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
        <div className="px-8 py-6">
          {/* ✅ 여기서 deleteMessage 사용 */}
          <h2 className="text-lg font-medium mb-5 text-center text-gray-800">
            {deleteMessage || "해당 항목을 삭제하시겠습니까?"}
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={cancel}
              className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition-all cursor-pointer"
            >
              취소
            </button>
            <button
              onClick={deleteClick}
              className="px-5 py-2.5 rounded-lg bg-red-500 text-white font-medium shadow-sm hover:bg-red-600 transition-all cursor-pointer"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionModal;
