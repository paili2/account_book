interface Button {
  onClick?: () => void;
  text: string;
  type?: "submit";
  className?: string;
}

const Button = ({ onClick, text, type, className }: Button) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-4 py-2  rounded  cursor-pointer ${className} ${
        text == "취소"
          ? "bg-gray-300 hover:bg-gray-400"
          : text == "삭제"
          ? " bg-red-500 text-white hover:bg-red-600"
          : "bg-blue-500 text-white hover:bg-blue-600 "
      } `}
    >
      {text}
    </button>
  );
};

export default Button;
