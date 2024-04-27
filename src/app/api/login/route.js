import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers"

export const POST = async (req, {params}) => {
  try {

    const {email, password} = await req.json();
    const user = await prisma.user.findFirst({
      where: {
        email,
      }
    })

    if(!user){
      throw {name: "InvalidCredentials"}
    }

    const matchPassword = await bcrypt.compare(password, user.password)

    if(!matchPassword){
      throw {name: "InvalidCredentials"}
    }

    if(matchPassword){

      const accessToken = jwt.sign({
        id: user.id,
        email: user.email,
      }, process.env.SECRET_KEY)
      
      cookies().set({
        name: "accessToken",
        value: accessToken,
        maxAge: 60 * 60 * 24 * 7
      })
    }

    return NextResponse.json({message: "Login Successful!"}, {status: 200})

  } catch (error) {
      if(error.name === "InvalidCredentials"){
        return NextResponse.json({message: "Invalid Username or Password"})
      } else {
      return NextResponse.json({message: "Internal Server Error!"})
    }
  }
}