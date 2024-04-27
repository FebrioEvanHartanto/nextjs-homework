"use client"

import {useState} from 'react'
import { login } from '@/fetch/auth';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await login({email, password});
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Login Success!",
      });
      router.push("/");
    } catch (error) {
        console.log("Something went wrong!", error)
        Swal.fire({
          icon: "error",
          title: "Invalid Username or Password!",
          text: "Please enter the correct username or password!",
        });
    } 
  }
  
  return (
    <>
      <input type='email' placeholder='Enter Email...'  onChange ={(e) => setEmail(e.target.value)}/>
      <input type='password' placeholder='Enter Password...' onChange ={(e) => setPassword(e.target.value)}/>
      <button type='button' onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default Login