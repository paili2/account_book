"use client";

import Button from "../../ui/Button";

interface SingleSelectionAlertModalProps {
  confirm: () => void;
  message: string;
}

const SingleSelectionAlertModal = ({
  confirm,
  message,
}: SingleSelectionAlertModalProps) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-96 shadow-2xl border-b border-gray-100">
        <div className="w-full bg-blue-500 rounded-t-xl flex justify-center items-center py-2">
          <h2 className="text-white text-lg font-semibold">알림</h2>
        </div>
        <div className="px-8 py-6">
          <h2 className="text-lg font-medium mb-5 text-center text-gray-800">
            {message}
          </h2>
          <div className="flex justify-center">
            <Button onClick={confirm} text="확인"></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleSelectionAlertModal;
