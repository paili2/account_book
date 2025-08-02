interface LogoutButtonProps {
  onClick: () => void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-300 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition cursor-pointer"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
