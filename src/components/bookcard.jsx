"use client";

import { deleteBook, updateBook } from "@/fetch/books";
import { useRouter } from "next/navigation";
import Image from "next/image";

const BookCard = ({ data }) => {
  const router = useRouter();

  const handleUpdate = async (id) => {
    await updateBook(id);
    router.push(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    router.refresh();
  };

  return (
    <>
      {data.map((book, index) => (
        <div
          className="bg-gray-300 rounded-xl w-full px-10 py-20 flex flex-col gap-y-3 "
          key={index}
        >
          <Image
            src={book.imageUrl}
            alt="Book Cover Image"
            width={300}
            height={300}
            className="object-cover "
          />
          <p className="text-xl font-bold">
            Book Title :{" "}
            <span className="font-normal text-md">{book.title}</span>
          </p>
          <p className="text-xl font-bold">
            Author : <span className="font-normal text-md">{book.author}</span>
          </p>
          <p className="text-xl font-bold">
            Publisher :{" "}
            <span className="font-normal text-md">{book.publisher}</span>
          </p>
          <p className="text-xl font-bold">
            Year : <span className="font-normal text-md">{book.year}</span>
          </p>
          <p className="text-xl font-bold">
            Pages : <span className="font-normal text-md">{book.pages}</span>
          </p>

          <div className="flex justify-between items-center text-center text-white mt-10">
            <button
              onClick={() => handleUpdate(book.id)}
              className="bg-red-500 w-fit px-4 py-2"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(book.id)}
              className="bg-blue-500 w-fit px-4 py-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BookCard;
