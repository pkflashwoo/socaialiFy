import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar';
import {Link} from 'react-router-dom';
import like_filled from '../../assets/logo/like-filled.svg';
import like_notfilled from '../../assets/logo/like-notfilled.svg';
import comment from '../../assets/logo/comment.svg';
import axios from 'axios';
import './post.css';

const Post = ({id}) => {
 // const[postData,SetPostData]=useState({});
  //const userId = '63c021b8d01fb2ad620c7ce5';
  const[userData,SetUserData]=useState({});
  const[postText,SetPostText]=useState('');
 // const[likes,SetLikes]=useState([]);
 const[userId,SetUserId]=useState(null);
  const [liked,SetLiked] =useState(false);
  const[likeNumber,SetLikeNumber]=useState(0);
  const[postImage,SetImage]=useState('');
  const dummyUrl = `https://th.bing.com/th/id/OIP.2NK1UkThGiT-57ykxRmfvwHaHZ?pid=ImgDet&w=700&h=699&rs=1`
  const dummytext = `   #CheemsInu WILL TAKE OVER THE MEMECOIN MARKET SOON. BE PREPARED 💰💰💰💰 FILL YOUR BAGS UP
 
  $CINU #CheemsInu  #cheems #CHEEMSARMY #BSC #BSCGem #GEM #cryptocurrency #Breakout #gains #earlygem #100xgem #1000xgem #NFT #metaverse #passiveincome 
  @1goonrich
  
  @CheemsInu`

  const handleLike=async(e)=>{
   
    e.preventDefault();
try {
  const res=await axios({
    method: 'put',
    withCredentials : true,
    headers:{
      "Content-Type":"application/json"
    },
    url: `http://localhost:4000/socialify/posts/${id}/likes`,
  
   })
  

    // const res =await fetch(`http://localhost:4000/socialify/posts/${id}/likes`,{
    //     method:"PUT",
            
    //   })


      const jsonData = await res.data;
      
      if(jsonData.success){
        console.log('liked');
       console.log(jsonData);

      }
      else{
        alert(jsonData.message);
      }

} catch (error) {

  alert(error.response.data.message);
}
   
    
  }

  const handleUnlike=async(e)=>{
   
    e.preventDefault();
    try {
      const res=await axios({
        method: 'delete',
        withCredentials : true,
        headers:{
          "Content-Type":"application/json"
        },
        url: `http://localhost:4000/socialify/posts/${id}/likes`,
      
       })
    
    
          const jsonData = await res.data;
          
          if(jsonData.success){
            console.log('unlikedliked');
           console.log(jsonData);
    
          }
          else{
            console.log('not  unlikedliked');
            alert(jsonData.message);
          }
    } 
    
    catch (error) 
    {
    
      alert(error.response.data.message);
    }
   
    
  }

 useEffect(()=>{
  const toSetLikeBtn = (likes,id)=>{
    likes.forEach(element => {
      if(element===id)
      SetLiked(true);
      else{
        SetLiked(false);
      }
    });
  }

  const getCurrentUser = async (data)=>{
    const res=await axios({
      method: 'get',
      withCredentials : true,
      headers:{
        "Content-Type":"application/json"
      },
      url: `http://localhost:4000/socialify/user/me`,
    
     })

   //  console.log('curr user',res.data);
     SetUserId(res.data.user._id);
     toSetLikeBtn(data.likes,res.data.user._id);


  }
  const GetUSerData = async(aid)=>{
    console.log(aid);
    const res = await fetch(`http://localhost:4000/socialify/user/${aid}`);
    const data = await res.json();
    //console.log(data);
  
   
    return data;
  }
  const GetPost =async()=>{
    const res = await fetch(`http://localhost:4000/socialify/post/${id}`);
    const data = await res.json();
    //console.log(data);
   
    SetPostText(data.post.body.text);
 
    SetLikeNumber(data.post.likes.length);
   getCurrentUser(data.post);
    SetImage(data.post.body.images[0].url);
    return data;
  

  }

const fetchDatas =async ()=>{
  const postDatak = await GetPost();
 // console.log(postDatak);
  const userDatak = await GetUSerData(postDatak.post.user);
//  console.log('after');
 // SetPostData(postDatak);
  SetUserData(userDatak.user);
 

  
}


fetchDatas();
 },[id]);
 


  const likeed =(e)=>{
   if(userId===null){

     alert('login First');
     return;
    }
    SetLiked(!liked);
    if(liked)
    {
     
      SetLikeNumber(likeNumber-1);
      handleUnlike(e);
    }
    else
    {
      
      SetLikeNumber(likeNumber+1);
      handleLike(e);
    }
  }

//console.log(liked);

  return (
    <>
    <div className="postOuter">
      <div className="postLeft">
        <Link to={`/profile/${userData!==undefined?userData._id:'63c24bbacbae87aa79729e06'}`}>
        <Avatar imgUrl={'https://th.bing.com/th/id/OIP.4DDpf8C8vq0uXAdyoPJhvwHaIt?pid=ImgDet&rs=1'}/>
        </Link>
        
      </div>
      <div className="postRight">
      <div className="postUserName">
      <Link to={`/profile/${userData?userData._id:'63c24bbacbae87aa79729e06'}`}>
        <strong>{userData?userData.username:'CheemsOpest'}</strong>
      </Link>
        </div>
      <div className="postText">
       
    {postText!==''?postText:dummytext}
      </div>
      <Link to ={`/post/${id}`}>
     
      <div className="postImage">
      <img  src={postImage?postImage:dummyUrl} className="img-fluid postImageInside" alt="..."/>
      </div>
      </Link>
      <div className="PostReactions">
       {
        likeNumber?likeNumber:0
       }
          {
            liked?<img src={like_filled} alt="" className="reactionIcon" onClick={likeed} />
            :
            <img src={like_notfilled} alt="" className="reactionIcon" onClick={likeed}/>

          }
        <Link to ={`/post/${id}`}>
          <img src={comment} alt="" style={{marginLeft:'0.25em'}} className="reactionIcon" />
        </Link>
        
        
     
      </div>
      </div>
    
    </div>
    </>
  )
}

export default Post