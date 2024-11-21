"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get("data") || "{}");
  const router = useRouter();

  const scoreClass =
    data.score < data.results.length / 2 ? "text-red-500" : "text-green-500";

  return (
    <div className="px-24 py-2">
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <p className={`text-4xl text-center mb-8 ${scoreClass}`}>
        Your Score is <span className="font-bold">{data.score}</span>
      </p>

      <Table>
        <TableCaption className="text-sm">
          A detailed list of your quiz results.
        </TableCaption>
        <TableHeader className="text-base">
          <TableRow>
            <TableHead>Question</TableHead>
            <TableHead>Your Answer</TableHead>
            <TableHead>Correct Answer</TableHead>
            <TableHead>Correct?</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-base">
          {data.results.map((result: any, index: number) => (
            <TableRow key={index}>
              <TableCell>{result.questionText}</TableCell>
              <TableCell>{result.userAnswer}</TableCell>
              <TableCell>{result.correctAnswer}</TableCell>
              <TableCell>{result.isCorrect ? "✔️" : "❌"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="my-8 flex justify-center">
        <button
          onClick={() => {
            router.push("/quizzes");
          }}
          className="text-lg py-2 px-8 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Go to All Quizzes
        </button>
      </div>
    </div>
  );
}
