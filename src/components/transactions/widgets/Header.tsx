import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeaderProps {
  addClick?: () => void;
  editClick?: () => void;
  deleteClick?: () => void;
}

const Header = ({ addClick, editClick, deleteClick }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="w-full max-w-4xl flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">거래 내역</h1>
      <div className="flex gap-7">
        <div className="flex justify-end gap-3">
          <button
            onClick={addClick}
            className="w-9 h-9 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition cursor-pointer"
          >
            <Plus size={15} />
          </button>
          <button
            onClick={editClick}
            className="w-9 h-9 flex items-center justify-center bg-gray-500 text-white rounded-full hover:bg-gray-600 transition cursor-pointer"
          >
            <Pencil size={15} />
          </button>
          <button
            onClick={deleteClick}
            className="w-9 h-9 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 transition cursor-pointer"
          >
            <Trash2 size={15} />
          </button>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
        >
          대시보드로
        </button>
      </div>
    </header>
  );
};

export default Header;
