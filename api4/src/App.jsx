import React,{useEffect, useState} from 'react'

import axios from 'axios'
import AddPost from './AddPost'

export default function App() {
  const [data , setData]=useState([]);
  const [update , setUpdate]=useState(false) ; 
  const [edit , setEdit]=useState(false)
  const [editTitle , setEditTitle]=useState("")
  useEffect(()=>{
    axios.get("http://localhost:3000/posts").then((response)=>setData(response.data)).catch((error)=>console.log(error))
    
    },[update])
    const DeletePost=(id)=>{
      axios.delete(`http://localhost:3000/posts/${id}`).then(res=>console.log(res))
      setUpdate((prevstate)=>!prevstate)
  }
  const UpdatePost=(id,newValue,obj)=>{
    axios.put(`http://localhost:3000/posts/${id}`,{...obj , title:newValue}).then(res=>console.log(res))
    setUpdate((prevstate)=>!prevstate)
}


  return (
    <div style={{display:"flex" , flexDirection:"column" , alignItems:"center" }} >
        <AddPost setUpdate={setUpdate}/>
        <div style={{display:"flex" , flexDirection:"column-reverse" , alignItems:"center" }}>
      {data.length!=0 ? data.map(e=>(
        <div style={{display:"flex" , flexDirection:"column" , padding:"1rem", margin:"1rem" , width:"50vw" , height:"50vh" , border:".5px solid black" , borderRadius:"1rem"}}>
          <div>
         <h5 onClick={()=>setEdit((state)=>!state)}>{e.title}</h5>
        {edit ? <div>
          <input type='text' onChange={(e)=>setEditTitle(e.target.value)}/>
          <button onClick={()=>{UpdatePost(e.id,editTitle,e);setEdit(false)}}>Update</button>
        </div>:null}
          
          <button onClick={()=>{DeletePost(e.id)}}>Delete</button>
         
         </div>
 
          <p style={{fontSize:".7rem"}}>{e.body}</p>
        </div>
      )):null}
      </div>
    </div>
  )
}
