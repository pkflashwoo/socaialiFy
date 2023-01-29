import React, { useState } from 'react'
import Avatar from '../Avatar/Avatar';
import './toComment.css';
import axios from 'axios';

const ToComment = ({post_id}) => {
  const[text,SetText]=useState('');
  const handleComment = async(e)=>{
  e.preventDefault();

  if(!text){
    alert('first type something in comment box');
  }

  else{

    try{
      const res=await axios({
        method: 'post',
        withCredentials : true,
        headers:{
          "Content-Type":"application/json"
        },
        url: `http://localhost:4000/socialify/posts/${post_id}/comments`,
        data: JSON.stringify({
          text:text    
      
       })
      });
  
      const jsonData = res.data;
  
      // const res =await fetch(`http://localhost:4000/socialify/posts/${post_id}/comments`,{
      //     method:"POST",
      //     headers:{
      //       "Content-Type":"application/json"
      //     },
      //     body:JSON.stringify({
  
         
      //     text:text,
          
        
  
      //     })
      
      //   })
  
  
      //   const jsonData = await res.json();
        
        if(jsonData.success){
         console.log(jsonData);
  
        }
        else{
          alert(jsonData.message);
        }
    }
    catch(err){
      alert(err.response.data.message);
    }
  
  }

  }
  return (
    <>
       <div className="tweetBoxOuter">
    <div className="tweetBoxUpper">

   <Avatar imgUrl={'https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1-1024x1024.jpg'}/>
   <input className='tweetBoxUpperInput'  onChange={(e)=>SetText(e.target.value)} type="text" placeholder="What's Happening ?" />
    </div>
    <div className="tweetBoxLowerBelow">
  
      <input type="button" className='SocalifyBtn' value={'comment'} onClick={(e)=>handleComment(e)} placeholder='Comment' />
    
    </div>
   </div>
    </>
  )
}

export default ToComment