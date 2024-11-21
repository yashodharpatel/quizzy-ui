"use client";

import { useQuestion } from "@/context/QuestionContext";
import { useEffect, useRef, useState } from "react";

export const Sidebar = () => {
  const { currentQuestion, setCurrentQuestion } = useQuestion();
  const [quiz, setQuiz] = useState<any | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      let selectedQuiz = localStorage.getItem("quiz");

      if (selectedQuiz) {
        setQuiz(JSON.parse(selectedQuiz));
        clearInterval(intervalId);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (sidebarRef.current) {
      const activeButton = sidebarRef.current.querySelector(
        `.question-button[data-index="${currentQuestion}"]`
      ) as HTMLElement;

      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [currentQuestion]);

  if (!quiz) {
    return <></>;
  }

  return (
    <aside
      ref={sidebarRef}
      className="w-[90px] bg-white shadow-md p-4 overflow-auto"
    >
      <ul className="space-y-3">
        {quiz.questions.map((_: any, index: any) => (
          <li key={index}>
            <button
              data-index={index}
              onClick={() => setCurrentQuestion(index)}
              className={`question-button flex items-center justify-center h-12 w-12 rounded-full text-lg font-bold ${
                currentQuestion === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
