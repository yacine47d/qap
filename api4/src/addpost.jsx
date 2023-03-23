import axios from 'axios'
import React, { useState } from 'react'

export default function AddPost({setUpdate}) {
    const [newPost , setNewPost]=useState({
        id:Date.now() , 
        userId:1 , 
        title:"",
        body:""
    })
    const SendPost=()=>{
        axios.post("http://localhost:3000/posts",newPost).then((res)=>console.log(res)).catch((err)=>console.log(err)) ; 
        setUpdate((prevState)=> !prevState)
    }
   
  return (
    <div style={{display:"flex" , flexDirection:"column" , padding:"1rem", margin:"1rem" , width:"50vw" , height:"70vh" , border:".5px solid black" , borderRadius:"1rem"}}>
        <input type="text" placeholder="Title" style={{borderRadius:"1rem" , margin:".3rem" , padding:".3rem" , border:".3px solid black"}} onChange={(e)=>setNewPost((prevState)=>{return{...prevState , title:e.target.value }})} />
        <textarea type="text" placeholder="Description"  style={{borderRadius:"1rem" , margin:".3rem" , padding:".3rem" ,border:".3px solid black"}}  onChange={(e)=>setNewPost((prevState)=>{return{...prevState , body:e.target.value }})} />
        <button style={{borderRadius:"1rem",margin:".3rem" , padding:".3rem" ,border:".3px solid black",backgroundColor:"white"}} onClick={()=>SendPost()}>Add post</button>
    </div>
  )
}
