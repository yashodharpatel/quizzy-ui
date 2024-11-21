"use client";

import { Sidebar } from "@/components/Sidebar";
import { QuestionProvider } from "@/context/QuestionContext";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const showSidebar = !/^\/quizzes\/quiz\/[^/]+\/result$/.test(pathname);

  return (
    <QuestionProvider>
      <div
        className={`flex  ${showSidebar && "bg-gray-100"}`}
        style={{ height: "calc(100vh - 75px)" }}
      >
        {showSidebar && <Sidebar />}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </QuestionProvider>
  );
}
