"use client";

import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [email, SetEmail] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const userId = localStorage.getItem("userId");

      if (userId) {
        setUserId(userId);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <nav className="bg-white border-b-2 shadow-sm fixed w-full h-[75px] top-0 left-0 z-10 p-4 px-32">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className=" text-3xl font-semibold">
          💬 𝓠uizzy
        </Link>
        {userId == "" && (
          <AlertDialog>
            <AlertDialogTrigger className="text-base py-2 px-10 border-2 border-blue-500 rounded-full shadow-md">
              Login
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Enter your Email</AlertDialogTitle>
                <AlertDialogDescription>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      SetEmail(e.target.value);
                    }}
                  />
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className=" bg-blue-500 hover:bg-blue-600"
                  onClick={() => {
                    localStorage.setItem("userId", email);
                  }}
                >
                  Login
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </nav>
  );
}
