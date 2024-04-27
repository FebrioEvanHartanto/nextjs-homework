"use client";

import Link from "next/link";
import Button from "@/components/button";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="bg-blue-300 w-full h-20 flex justify-between items-center px-8">
      <div className="text-white text-2xl font-bold hover:text-gray-500">
        <Link href="/">My Bookstore</Link>
      </div>

      <div className="flex gap-8">
        <Link href="/books">
          <Button buttonText="View Books" type="button" />
        </Link>
        <Link href="/create">
          <Button buttonText="Create Book" type="button" />
        </Link>
        <Button buttonText="Logout" type="button" />
      </div>
    </div>
  );
};

export default Navbar;
