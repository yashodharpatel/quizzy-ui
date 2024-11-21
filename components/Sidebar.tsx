"use client";

import { useQuestion } from "@/context/QuestionContext";
import { useEffect, useRef, useState } from "react";

interface Question {
  _id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  __v: number;
}

interface Quiz {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
  __v: number;
}

export const Sidebar = () => {
  const { currentQuestion, setCurrentQuestion } = useQuestion();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const selectedQuiz = localStorage.getItem("quiz");

      if (selectedQuiz) {
        setQuiz(JSON.parse(selectedQuiz) as Quiz);
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
        {quiz.questions.map((_, index) => (
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
