
import './fullpost.css';

import leftArrow from '../../assets/symbols/leftArrow.svg'
import React, { useEffect, useState } from 'react'
import Avatar from '../Avatar/Avatar';
import {Link, useParams} from 'react-router-dom';
import like_filled from '../../assets/logo/like-filled.svg';
import like_notfilled from '../../assets/logo/like-notfilled.svg';
import comment from '../../assets/logo/comment.svg';
import IndiComment from '../IndiComments/IndiComment';
import ToComment from '../ToComment/ToComment';
import axios from 'axios';
const FullPost = () => {
  const {post_id}: { post_id: string } = useParams();
  //console.log('post id ',post_id);
  const id = post_id;
  // const userId = '63c021b8d01fb2ad620c7ce5';
    const [liked,SetLiked] =useState(false);
    const[userName,SetUSerNAme]=useState('');
    const[postData,SetPostData]=useState({});
    const[userData,SetUserData]=useState({});
    const[comments,SetComments]=useState([]);
    const[postText,SetPostText]=useState('');
    const[postImage,SetImage]=useState('');
    const[userId,SetUserId]=useState(null);
    const[likeNumber,SetLikeNumber]=useState(0);
    const[uId,SetUid]=useState('');

    const dummyUrl = `https://th.bing.com/th/id/OIP.2NK1UkThGiT-57ykxRmfvwHaHZ?pid=ImgDet&w=700&h=699&rs=1`
    const dummytext = `   #CheemsInu WILL TAKE OVER THE MEMECOIN MARKET SOON. BE PREPARED 💰💰💰💰 FILL YOUR BAGS UP
   
    $CINU #CheemsInu  #cheems #CHEEMSARMY #BSC #BSCGem #GEM #cryptocurrency #Breakout #gains #earlygem #100xgem #1000xgem #NFT #metaverse #passiveincome 
    @1goonrich
    
    @CheemsInu`;


    const handleLike=async(e)=>{
   
      e.preventDefault();
  
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
            console.log('not liked');
            alert(jsonData.message);
          }
      
    }

    const handleUnlike=async(e)=>{
   
      e.preventDefault();
  
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


    const likeed =(e)=>{
      if(userId===null){
        alert('please login first');
        return;
      }
      SetLiked(!liked);
      if(liked){

        SetLikeNumber(likeNumber-1);
        handleUnlike(e);
      }
      else{
        SetLikeNumber(likeNumber+1);
        handleLike(e);
      }

    }
useEffect(()=>{

  const toSetLikeBtn = (likes,id)=>{
    likes.forEach(element => {
      console.log(likes);
      console.log(userId);
      if(element===id){
// console.log('element ',element,' userId ',userId);
        SetLiked(true);
      }
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
  const GetUSerData = async(uid)=>{
    const res = await fetch(`http://localhost:4000/socialify/user/${uid}`);
    const data = await res.json();
    SetUSerNAme(data.user.username);
   
    return data;
  }
  const getCommentData =async()=>{
    const res = await fetch(`http://localhost:4000/socialify/posts/${post_id}/comments`);
    const data = await res.json();
    SetComments(data.comments);
  }
  const GetPost =async()=>{
  //  http://localhost:4000/socialify/post/63cda05541da059ca47137a0
    const res = await fetch(`http://localhost:4000/socialify/post/${post_id}`);
    const data = await res.json();
    SetUid(data.user);
    SetPostText(data.post.body.text);
    SetImage(data.post.body.images[0].url);
    getCurrentUser(data.post);
    // toSetLikeBtn(data.post.likes);
    SetLikeNumber(data.post.likes.length);
   
    return data;
  

  }

const fetchDatas =async ()=>{
  const postDatak = await GetPost();
  const userDatak = await GetUSerData(postDatak.post.user);
  getCommentData();
 SetPostData(postDatak);
  SetUserData(userDatak.user);
 

  
}
fetchDatas();
},[post_id])
// console.log(postData);
// //console.log(userData);
// console.log(userId);
// console.log(liked); 
console.log(comments);
  return (
   <>
  
   <div className="FullPostOuter">

    <div className="TopNav">
        <Link to={'/'} >
        <img className='navLeftArrow'  src={leftArrow} alt="lol" />
        </Link>
        <strong style={{marginLeft:'1rem',fontSize:'x-large'}}>Tweet</strong>
    </div>
    <hr />
    <div className="postOuter">
      <div className="postLeft">
        <Link to={`/profile/${uId!==undefined?uId:'63c24bbacbae87aa79729e06'}`}>
        <Avatar imgUrl={'https://th.bing.com/th/id/OIP.4DDpf8C8vq0uXAdyoPJhvwHaIt?pid=ImgDet&rs=1'}/>
        </Link>
        
      </div>
      <div className="postRight">
      <div className="postUserName">
      <Link to={`/profile/${uId!==undefined?uId:'63c24bbacbae87aa79729e06'}`}>
        <strong>{userName?userName:'CheemsOpest'}</strong>
      </Link>
        </div>
      <div className="postText">
    {
      postText!==''?postText:dummytext
    }
      </div>
      <div className="postImage">
      <img  src={postImage?postImage:dummyUrl} className="img-fluid postImageInside" alt="..."/>
      </div>
      <div className="PostReactions">
       {
        likeNumber?likeNumber:0
       }
          {
            liked?<img src={like_filled} alt="" className="reactionIcon" onClick={(e)=>likeed(e)} />
            :
            <img src={like_notfilled} alt="" className="reactionIcon" onClick={(e)=>likeed(e)}/>

          }
     
        
        <img src={comment} alt="" style={{marginLeft:'0.25em'}} className="reactionIcon" />
     
      </div>
      </div>

    
    </div>

    <div className="FullPostAllComments">
        <h5 className='FullPostCommentsh5'><strong>Comments</strong></h5>
        <div className="toCommentBox">

        <ToComment post_id={post_id}/>
        </div>
        <br />
        {
          comments.length>0?
          comments.map((comment)=>{
           // console.log(comment);
            return(<>
            <IndiComment text = {comment.text} />
            
            </>)
          }):<></>
        }
       
     
    </div>

   </div>
   </>
  )
}

export default FullPost