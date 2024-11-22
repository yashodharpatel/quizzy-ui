"use client";

import { useQuestion } from "@/context/QuestionContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

export default function QuizPage({ params }: { params: { id: string } }) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId: string =
      localStorage.getItem("userId") ?? "patelyashodhar012@gmail.com";

    if (userId) setUserId(userId);

    const storedQuizzes = localStorage.getItem("quizzes");

    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes) as Quiz[]);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const { currentQuestion, setCurrentQuestion } = useQuestion();
  const router = useRouter();

  const quiz = quizzes.find((quiz) => quiz._id === params.id);

  if (quiz) {
    localStorage.setItem("quiz", JSON.stringify(quiz));
  }

  const [answers, setAnswers] = useState<{ [key: number]: number | null }>(
    () =>
      quiz?.questions.reduce(
        (acc: { [key: number]: number | null }, _, index: number) => {
          acc[index] = null;
          return acc;
        },
        {}
      ) || {}
  );

  if (loading) {
    return <div className="text-3xl text-center">Loading Quiz...</div>;
  }

  if (!quiz) {
    return <div className="text-3xl text-center">Quiz Not Found!</div>;
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    const responses = quiz.questions.map((question, index) => {
      return {
        questionId: question._id,
        answer: answers[index],
      };
    });

    const payload = {
      quizId: quiz._id,
      userId: userId,
      responses,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/responses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const data = await response.json();
        router.push(
          `/quizzes/quiz/${params.id}/result?data=${encodeURIComponent(
            JSON.stringify(data.data)
          )}`
        );
      } else {
        console.error("Failed to submit responses");
      }
    } catch (error) {
      console.error("Error while submitting the responses:", error);
    }
  };

  return (
    <div className="px-4 py-2">
      <h1 className="text-3xl font-bold mb-2">{quiz.title}</h1>
      <p className="text-gray-600 mb-8">{quiz.description}</p>
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-xl mb-4">Question {currentQuestion + 1}</h2>

        <p className="text-xl mb-6 text-black font-semibold">
          {quiz.questions[currentQuestion].questionText}
        </p>

        <div className="flex flex-col gap-4 mb-16 text-black font-semibold">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center gap-3 p-3 border rounded-md cursor-pointer 
                ${
                  answers[currentQuestion] === index
                    ? "border-blue-500"
                    : "border-gray-300 hover:border-blue-400"
                }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion}`}
                checked={answers[currentQuestion] === index}
                onChange={() => handleOptionChange(currentQuestion, index)}
                className="form-radio"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`py-2 px-4 rounded-md flex justify-center items-center gap-3 ${
              currentQuestion === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            <ChevronLeft />
            PREVIOUS QUESTION
          </button>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="py-2 px-4 rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              SUBMIT
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="py-2 px-4 rounded-md flex justify-center items-center gap-3 bg-blue-500 text-white hover:bg-blue-600"
            >
              NEXT QUESTION
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
