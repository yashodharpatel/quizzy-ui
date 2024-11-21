"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AllQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/quizzes`
        );
        const fetchedQuizzes = response.data;

        localStorage.setItem("quizzes", JSON.stringify(fetchedQuizzes));

        setQuizzes(fetchedQuizzes);
      } catch (err) {
        setError("Failed to load quizzes");
        console.error("Error fetching quizzes: ", err);
      } finally {
        setLoading(false);
      }
    };

    const storedQuizzes = localStorage.getItem("quizzes");
    if (storedQuizzes) {
      setQuizzes(JSON.parse(storedQuizzes));
      setLoading(false);
    } else {
      fetchQuizzes();
    }
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <div className="text-3xl pt-10">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 text-3xl pt-10">{error}</p>
      </div>
    );
  }

  return (
    <div className="px-16 py-10">
      <h1 className="text-4xl font-bold mb-14 flex justify-center items-center gap-6">
        All Quizzes <Filter size={35} fill="black" />
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {quizzes.map((quiz: any) => (
          <Card
            key={quiz._id}
            className="bg-white shadow-md rounded-md border-2 border-gray-200"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold mb-2">
                {quiz.title}
              </CardTitle>
              <CardDescription className="text-lg text-gray-700 mb-6">
                {quiz.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={`quizzes/quiz/${quiz._id}`}>
                <button className="text-lg py-2 px-12 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                  Start Quiz
                </button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
