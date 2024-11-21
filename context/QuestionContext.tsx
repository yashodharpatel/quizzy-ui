"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface QuestionContextType {
  currentQuestion: number;
  setCurrentQuestion: (index: number) => void;
}

const QuestionContext = createContext<QuestionContextType | undefined>(
  undefined
);

export function QuestionProvider({ children }: { children: ReactNode }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  return (
    <QuestionContext.Provider value={{ currentQuestion, setCurrentQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
}

export function useQuestion() {
  const context = useContext(QuestionContext);
  if (!context) {
    throw new Error("useQuestion must be used within a QuestionProvider");
  }
  return context;
}
