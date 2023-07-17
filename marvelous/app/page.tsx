import Image from 'next/image'
import {TodoItem} from '@/components/TodoItem'
import DeleteButton  from '@/components/DeleteButton'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode, useState } from 'react'
import {redirect} from 'next/navigation'

async function getTodos() {
  const res = await fetch('http://localhost:8000/fetch_todos', {method: 'GET', cache: 'no-store'})

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function createTodo(data: FormData){
  "use server"
  
  const title = data.get("title")?.valueOf()
  if(typeof title !== "string" || title.length === 0){
    throw new Error ("Invalid title")
  }
  
  const addTodo = await fetch("http://localhost:8000/add_todo", {
      method: "POST",
      body: JSON.stringify({
        "title": title,
        "complete": false
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    //need to re-get the list
    redirect("/")

}

async function toggleTodo(id: string, complete: boolean){
  "use server"
  
  const toggleTodoReq = await fetch("http://localhost:8000/toggle_todo", {
    method: "POST",
    body: JSON.stringify({
      "id": id,
      "complete": complete
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })


}



export default async function Home() {

 
  const todos = await getTodos()

  

  

  return(
    <>
        
        <header className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl'>Marvelous v2.0</h1>
          <DeleteButton />
        </header>
        <div className='py-3 flex flex-row'>
          <div className='py-2 basis-1/2'>
            <form action={createTodo}>
                <input type="text" name="title" className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'/>
                <button type="submit" className='border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none mx-2'>Add</button>
            </form>
          </div>

          <div className='py-2 basis-1/2'>
            
            <input type="text"  name="search" placeholder="Search..." className='float-right border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'/>
           
          </div>
        </div>
        

        <div className='py-3 flex flex-row'>
          <div className='grow'>
            <h2 className='border-b-2 border-slate-300'>To Do</h2>
            <ul className="pl-4">
              {todos.data.filter((item:any) => item.complete===false).map((todo:any) => (
                <TodoItem key={todo.id}{...todo} toggleTodo={toggleTodo}/>
              ))}
            </ul>
          </div>

          <div className='grow px-3'>
          <h2 className='border-b-2 border-slate-300'>Done</h2>
            <ul className="pl-4">
              {todos.data.filter((item:any) => item.complete).map((todo:any) => (
                <TodoItem key={todo.id}{...todo} toggleTodo={toggleTodo}/>
              ))}
            </ul>
          </div>
          
          
        </div>
        
      
    </>
  
  ) 
}
