import Image from 'next/image'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'


async function getTodos() {
  const res = await fetch('http://localhost:8000/fetch_todos')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}


export default async function Home() {
  const todos = await getTodos()

  return(
  <>
    <header className='flex justify-between items-center mb-4'>
      <h1 className='text-2xl'>Marvelous v2.0</h1>
      <button className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none' >Delete all tasks</button>
    </header>

    <ul className="pl-4">
      {todos.map((todo: { id: Key ; title: string  }) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  </>
  ) 
}
