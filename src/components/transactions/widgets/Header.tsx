import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <header className="w-full max-w-4xl flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">거래 내역</h1>
      <button
        onClick={() => router.push("/dashboard")}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
      >
        대시보드로
      </button>
    </header>
  );
};

export default Header;
