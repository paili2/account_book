"use client";

import { ChangeEvent, useState } from "react";

const HandleInputChange = <T extends Record<string, any>>(
  e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  setForm: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setForm((prev) => ({ ...prev, [name]: value }));
};

export default HandleInputChange;
