"use client";

import { useState } from "react";

const ToggleModal = (
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setIsModalOpen((prev) => !prev);
};

export default ToggleModal;
