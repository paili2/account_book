import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../../common/ui/Button";
import IconButton from "../../common/ui/IconButton";
import Title from "../../common/ui/Title";

interface HeaderProps {
  addClick: () => void;
  editClick: () => void;
  deleteClick: () => void;
}

const Header = ({ addClick, editClick, deleteClick }: HeaderProps) => {
  const router = useRouter();
  return (
    <header className="w-full max-w-4xl flex justify-between items-center mb-6">
      <Title>거래 내역</Title>
      <div className="flex gap-7">
        <div className="flex justify-end gap-3">
          <IconButton onClick={addClick} color="blue">
            <Plus size={15} />
          </IconButton>
          <IconButton onClick={editClick} color="gray">
            <Pencil size={15} />
          </IconButton>
          <IconButton onClick={deleteClick} color="red">
            <Trash2 size={15} />
          </IconButton>
        </div>
        <Button
          onClick={() => router.push("/dashboard")}
          text="대시보드로"
        ></Button>
      </div>
    </header>
  );
};

export default Header;
