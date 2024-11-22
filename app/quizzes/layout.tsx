"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userId: string =
      localStorage.getItem("userId") ?? "patelyashodhar012@gmail.com";

    if (userId) setUserId(userId);
  }, []);

  const logAbandonment = async (
    userId: string,
    quizId: string
  ): Promise<void> => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/log-abandonment`,
        {
          userId,
          quizId,
        }
      );
    } catch (error) {
      console.error(`Error logging abandonment: ${error}`);
    }
  };

  useEffect(() => {
    logAbandonment(
      userId == "" ? "patelyashodhar012@gmail.com" : userId,
      "673f2e7ef21735fa57e8f425"
    );
  }, [pathname]);

  return (
    <div>
      <main className="mt-[75px]">{children}</main>
    </div>
  );
}
