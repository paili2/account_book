import Button from "../../ui/Button";

export interface AddTransactionButtonProps {
  onClick: () => void;
}

const AddTransactionButton = ({ onClick }: AddTransactionButtonProps) => {
  return (
    <>
      <Button
        onClick={onClick}
        text="거래 추가"
        className="flex-1 py-3"
      ></Button>
    </>
  );
};

export default AddTransactionButton;
