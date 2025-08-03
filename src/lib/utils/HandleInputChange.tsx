"use client";

import { ChangeEvent } from "react";

/**
 * 폼 입력 핸들러 (타입 안전 버전)
 * @param e input 또는 select의 change 이벤트
 * @param setForm 상태 업데이트 함수
 */
const HandleInputChange = <T extends Record<string, unknown>>(
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  setForm: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

export default HandleInputChange;
