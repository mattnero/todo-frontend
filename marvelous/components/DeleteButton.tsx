"use client"

import React from 'react';
import {redirect} from 'next/navigation'
import { useRouter } from "next/navigation";

const DeleteButton = () => {
  const router = useRouter();
  const handleClick = async () => {
    
    const res = await fetch('http://localhost:8000/delete', {method: 'GET', cache: 'no-store'})

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    router.refresh();
  };
  
  return <button onClick={handleClick} className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none' >Delete all tasks</button>;

};

export default DeleteButton;
