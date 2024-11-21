import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b-2 shadow-sm fixed w-full h-[75px] top-0 left-0 z-10 p-4 pl-32">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className=" text-3xl font-semibold">
          💬 𝓠uizzy
        </Link>
      </div>
    </nav>
  );
}
