"use client";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main className="mt-[75px]">{children}</main>
    </div>
  );
}
