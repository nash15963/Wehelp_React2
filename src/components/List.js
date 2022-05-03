import React ,{ useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { collection , doc, getDocs ,addDoc , deleteDoc} from 'firebase/firestore'
import { app } from '../firebaseConfig'
import '../cssFile/List.css'
import { getFirestore } from '@firebase/firestore'
// import { v4 as uuidv4 } from 'uuid';



const List = () => {
  const [input ,setInput] = useState('') ;
  const [todos ,setTodos] = useState([]) ;
  const db = getFirestore(app)
  const userCollectionRef = collection(db ,'List')

  useEffect(()=>{
    const getTodos = async()=>{
      const data = await getDocs(userCollectionRef)
      // console.log(data)
      setTodos(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
    }
    getTodos()
  },[todos])

  let onFormSubmit  = async(event)=>{
    event.preventDefault()
    // setTodos([...todos , {id: uuidv4(),title:input}])
    await addDoc(userCollectionRef,{title:input})
    //add item success
  }
  let handleDelete = async(id) =>{
    console.log(id)
    const usercDoc = doc(db , "List" ,id)
    await deleteDoc(usercDoc).then(setTodos(todos.filter((todo)=> todo.id !== id)) )
  }


  return (
    <div>
      <form className='inputfrom' onSubmit={onFormSubmit }>
        <input 
        type="text"  
        placeholder='todo...'
        required
        onChange={(event)=>{setInput(event.target.value)}}
        />
        <button>click</button>
      </form>
      <div className='output'>
        {todos.map((todo)=>{
          return<li key={todo.id}> todo:{todo.title} <button onClick={()=>handleDelete(todo.id)}>X</button></li>
        })}
      </div>
      <div className='back'>
        <Link to="/"> <button>back home</button></Link>
      </div>
    </div>
  )
}

export default List
