"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex-1 flex items-center justify-center bg-neutral-950 text-white w-full">
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/sign-up")}
          className="bg-white text-black font-medium px-6 py-2 rounded-md hover:bg-gray-200 transition-colors">
          Sign Up
        </button>
        <button
          onClick={() => router.push("/sign-in")}
          className="border border-neutral-600 text-white font-medium px-6 py-2 rounded-md hover:bg-neutral-800 transition-colors">
          Sign In
        </button>
      </div>
    </main>
  );
}