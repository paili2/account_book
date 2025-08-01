import { User } from "../DashboardPage";

interface UserGreetingProps {
  user: User;
}

const UserGreeting = ({ user }: UserGreetingProps) => {
  return (
    <section className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-700">
        환영합니다,
        <span className="text-blue-600"> {user.nickName}</span>님 👋
      </h2>
      <p className="text-gray-500 mt-2">
        오늘의 수입과 지출을 한눈에 확인해 보세요.
      </p>
    </section>
  );
};

export default UserGreeting;
