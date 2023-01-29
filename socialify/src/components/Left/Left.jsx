import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './left.css';
import logo  from '../../assets/logo/logo.svg';
import home from '../../assets/logo/home.svg';
import hashtag from '../../assets/logo/hashtag.svg';
import user from '../../assets/logo/user.svg';
import bell from '../../assets/logo/bell.svg';
import { Link,useNavigate } from 'react-router-dom';
const Left = () => {
  const[isLoggedIn,SetIsLoggedIn]=useState(false);
  const navigate = useNavigate();
  const handleLogout = async(e)=>{
   
    e.preventDefault();
    const res=await axios({
      method: 'get',
      withCredentials : true,
      headers:{
        "Content-Type":"application/json"
      },
      url: 'http://localhost:4000/socialify/user/logout',
   
    });
    if(res.data.success){
      console.log(' log out ho gaya ');
      console.log(res.data);
      
      SetIsLoggedIn(false);
    }
    else{
      console.log('log out nahi hua ');
      console.log(res.data);
    }
   
  }
 
  useEffect(()=>{
    const getCurrUser =  async()=>{
      const res=await axios({
        method: 'get',
        withCredentials : true,
        headers:{
          "Content-Type":"application/json"
        },
        url: 'http://localhost:4000/socialify/user/me',
     
      });


      console.log(res.data);
      SetIsLoggedIn(res.data.success);
    }

    getCurrUser();
  },[isLoggedIn])

  console.log('is logged in',isLoggedIn);
  return (
    <>


 <div className="leftOuter">
 
  <div className="menubar">
  <div className="logo">
  <Link to={'/'}>
 <img className="logoImg" src={logo} alt="" />
    </Link>
  </div>
    <Link to={'/'}>
    <div className="home menubarMenuItems">
    <img className="logoImg" src={home} alt="" />
   
    <span className="menuBarItemText">
    Home
    </span>
   
    </div>
    </Link>
    <Link to='/trending'>
    <div className="Trending menubarMenuItems">
    <img className="logoImg" src={hashtag} alt="" />
 
    
    <span className="menuBarItemText">
    Trending
    </span>
    </div>
    </Link>
    <Link to={'notifications/cheemsop'}>
    <div className="Notifications menubarMenuItems">
    <img className="logoImg" src={bell} alt="" />
 
    <span className="menuBarItemText">
    Notification 
    </span>
    </div>
    </Link>
    <Link to='/profile/chemmsOp'>
    <div className="Profile menubarMenuItems">
    <img className="logoImg" src={user} alt="" />
    
    <span className="menuBarItemText">
    Profile 
    </span>
    </div>
    </Link>
  </div>
  <div className="LoginLeft menubarMenuItems">

    {
      !isLoggedIn?
      <>
       <Link to='/login'>
    <span className="LoginLeftText">
    

    Login
    </span>
  </Link> 
      </>
      :
      <span className="LoginLeftText" onClick={(e)=>handleLogout(e)}>
    

      LogOut
      </span>
    }

      
  </div>
 </div>
    </>
  )
}

export default Left