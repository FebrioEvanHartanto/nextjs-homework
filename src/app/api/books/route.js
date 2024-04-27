import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

//GET ALL BOOKS
export const GET = async (req, {params}) => {
  
    try {
      const books = await prisma.book.findMany();
      
      return NextResponse.json(
        books, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: "Internal Server Error!"}, {status: 500})
    }
}

//CREATE BOOK
export const POST = async (req, {params}) => {

  const {title, author, publisher, year, pages, imageUrl} = await req.json();
  
  try {
   await prisma.book.create({
      data: {
        title,
        author,
        publisher,
        year,
        pages,
        imageUrl,
      }
    })

    return NextResponse.json({message: "Book Created Successfully!"},{status: 201 })

  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Internal Server Error"}, {status: 500})
  }

}