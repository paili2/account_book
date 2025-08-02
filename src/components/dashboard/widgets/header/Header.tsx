import PageTitle from "../../../common/PageTitle";
import LogoutButton from "./LogoutButton";

interface DashboardHeader {
  onClick: () => void;
}

const Header = ({ onClick }: DashboardHeader) => {
  return (
    <header className="w-full max-w-2xl flex justify-between items-center mb-6">
      <PageTitle title="대시보드"></PageTitle>
      <LogoutButton onClick={onClick}></LogoutButton>
    </header>
  );
};

export default Header;
