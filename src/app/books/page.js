import BookCard from "@/components/bookcard";
import prisma from "@/lib/prisma";

const Books = async () => {

  const books = await prisma.book.findMany();

  return(
    <div>
      
      {books ? (
        <>
          <h1 className="text-center font-bold text-3xl mt-10">List of Books</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5 px-10">
          <BookCard data = {books} />
          </div>
        </>
      ) : (
        <div className="text-3xl font-bold text-center mt-20 text-gray-500">There are no books at the moment!</div>
      )}
      
     
    </div>
  )
}

export default Books;