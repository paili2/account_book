import { useRouter } from "next/navigation";

const ViewTransactionsButton = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/transactions")}
      className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer"
    >
      거래 내역
    </button>
  );
};

export default ViewTransactionsButton;
