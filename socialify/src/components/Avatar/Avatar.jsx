import React from 'react'
import './avatar.css';
const Avatar = ({imgUrl}) => {
  return (
    <>
     <img src={imgUrl} alt='lol' className="avatar"/>
    
    </>
  )
}

export default Avatar