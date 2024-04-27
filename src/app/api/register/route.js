import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const POST = async (req, res) => {
  const {email, password} = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10)

  try { 
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if(existingUser) {
      return NextResponse.error({
        status: 400,
        message: "A user with that email already exist!"
      })
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })

    return NextResponse.json({message: "User Created Successfully!" , data: newUser})

  } catch (error) {
      return NextResponse.json({message: "Internal Server Error"}, error)
  }
}