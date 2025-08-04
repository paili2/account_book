import Button from "../../ui/Button";

interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <>
      <Button
        onClick={onClick}
        text="로그아웃"
        className="bg-gray-300 text-white hover:bg-gray-500 transition"
      ></Button>
    </>
  );
};

export default LogoutButton;
