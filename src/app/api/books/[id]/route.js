import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

//Get Book By Id
export const GET = async (req, {params}) => { 
  try {
    
     const {id} = params;
    const book = await prisma.book.findUnique({
      where:{
        id: +id,
      }
    })

    if(!book) {
      throw {name: "ErrorNotFound"}
    }

    return NextResponse.json(book, {status: 200})

  } catch (error) {
     
      if(error.name === "ErrorNotFound") {
          return NextResponse.json({message:"Cannot find book with that ID!"});
      } else {
         return NextResponse.json({message : "Internal Server Error"}, {status: 500});
    }
  }

}

//Edit Book
export const PUT = async (req, {params}) => {
  try {
    const {id} =  params;
    const {title, author, publisher, year, pages} = await req.json();
    const updatedBook = await prisma.book.update({
      where: {
        id: +id
      },
      data: {
        title,
        author,
        publisher,
        year: +year,
        pages: +pages
      }
    })

    return NextResponse.json({message: "Book Updated Successfully!", updatedBook})
    
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Internal Server Error!", error})
  }
}

export const DELETE = async (req, {params}) => {

    const {id} = params;

    const book = await prisma.book.findFirst({
      where: {
        id: +id
      }
    })

    try {

      if(!book) {
        throw {name: "ErrorNotFound"}
      } else {
      await prisma.book.delete({
        where: {
          id: +id
        }
      })
    }
      return NextResponse.json({message: "Book Successfully Deleted!"})
    } catch (error) {
      
      if(error.name === "ErrorNotFound") {
        return NextResponse.json({message:"Cannot find book with that ID!"});
    } else {
       return NextResponse.json({message : "Internal Server Error"}, {status: 500});
  }
    }
}