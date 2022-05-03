import React from 'react'
// import Example from './components/Example'
import { useState ,useEffect } from 'react'
import { db } from '../firebaseConfig'
import { collection , doc, getDocs ,addDoc ,updateDoc, deleteDoc} from 'firebase/firestore'
// import Home from './components/Home'
// import List from './components/List'
//import { code } from './key.js'


const User = () => {
  const [newname , setNewname] = useState('')
  const [newage , setNewage] = useState(0)
  
  const [users , setUsers] = useState([])
  const userCollectionRef = collection(db ,'user')
  let Createuser =async()=>{
    await addDoc(userCollectionRef,{name : newname ,age:Number(newage)})
  }
  const updateUser = async (id,age)=>{
    const userDoc = doc(db , "user" ,id)
    const newFileds ={age :age+1}
    await updateDoc(userDoc ,newFileds)
  }
  const deleteUser =async(id)=>{
    const usercDoc = doc(db , "user" ,id)
    await deleteDoc(usercDoc)
  }

  useEffect(()=>{
    const getUsers = async ()=>{
      const data = await getDocs(userCollectionRef)
      console.log(data)
      setUsers(data.docs.map((doc)=>({...doc.data(), id: doc.id})))
      //...doc.data() get all the fields in SQL ,and i want to bring the id out,
      //it means i need to type in "id: doc.id"
    }
    getUsers()
  },[])
  return (
    <div>
      <input type="text" placeholder='add name...'  onChange={(event)=>{setNewname(event.target.value)}}/>
      <input type="number" placeholder='add age...' onChange={(event)=>{setNewage(event.target.value)}}/>
      <button onClick={Createuser}>add data</button>
      {users.map((user)=>{return <div> 
        <h1>user:{user.name}</h1> 
        <h1>age:{user.age}</h1> 
        <button onClick={()=>{updateUser(user.id ,user.age)}}>+ age</button>
        <button onClick={()=>{deleteUser(user.id)}}>- user</button>
        </div>})}
    </div>
  )
}

export default User