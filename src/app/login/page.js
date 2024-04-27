"use client"

import {useState} from 'react'
import { login } from '@/fetch/auth';
import { useRouter } from 'next/navigation';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await login({email, password});
    router.push("/");
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