"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const login = () => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const isMatch = users.find(
        (user: any) =>
          user.email === form.email && user.password === form.password
      );
      if (isMatch) {
        alert("로그인 성공");
        localStorage.setItem("loggedInUser", JSON.stringify(isMatch));
        router.push("/dashboard");
      } else alert("아이디 혹은 비밀번호가 일치하지 않습니다");
    } catch (err) {
      alert("에러발생");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 tracking-tight">
          Account Book
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          오늘의 지출을 기록해 보세요 📒
        </p>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
          <input
            type="email"
            name="email"
            placeholder="이메일"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition cursor-pointer font-semibold"
          >
            로그인
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">계정이 없으신가요?</p>
          <a
            href="/signup"
            className="text-blue-500 hover:underline font-medium"
          >
            회원가입
          </a>
        </div>
      </div>
    </main>
  );
}
