export interface AddTransactionButtonProps {
  onClick: () => void;
}

const AddTransactionButton = ({ onClick }: AddTransactionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer"
    >
      거래 추가
    </button>
  );
};

export default AddTransactionButton;
