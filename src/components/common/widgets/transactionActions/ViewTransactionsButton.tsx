import { useRouter } from "next/navigation";
import Button from "../../ui/Button";

const ViewTransactionsButton = () => {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => router.push("/transactions")}
        text="거래 내역"
        className="flex-1 py-3"
      ></Button>
    </>
  );
};

export default ViewTransactionsButton;
