"use client";

import { createContext, useContext, useState } from "react";

const ModalContext = createContext<{ open: boolean; openModal: () => void; closeModal: () => void }>({
  open: false, openModal: () => {}, closeModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
