"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({ email: "", password: "", nickName: "" });
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const isExist = users.some((user: any) => user.email === form.email);
      if (!isExist) {
        users.push(form);
        localStorage.setItem("users", JSON.stringify(users));
        router.push("/login");
      } else alert("이미 존재하는 이메일입니다");
    } catch (err) {
      alert("에러 발생");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600 tracking-tight">
          Account Book
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
          간단한 정보만 입력하고 가계부를 시작하세요 📝
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <input
            type="text"
            name="nickName"
            placeholder="닉네임"
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
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
            회원가입
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">이미 계정이 있으신가요?</p>
          <a
            href="/login"
            className="text-blue-500 hover:underline font-medium"
          >
            로그인
          </a>
        </div>
      </div>
    </main>
  );
}
