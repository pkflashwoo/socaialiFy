import React from 'react'
import './hashtag.css';
import { Link } from 'react-router-dom';
import leftArrow from '../../assets/symbols/leftArrow.svg'
import Post from '../Posts/Post';
const HashTag = () => {
  return (
   <>
   <div className="hashTagUpper">

    <div className="navAndUserName">
        <Link to={'/'} >
            <img className='navLeftArrow'  src={leftArrow} alt="lol" />
        </Link>
        <div className="navTextWraaper">
            <strong className='navUserName'>
                Cheems Vimdhayak        
            </strong>
            <small className="navNumberOfSocialIfy">
                    2k Tweets
            </small>
        </div>
     </div> 
   </div>

   <div className="hashTagLower">

    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
   </div>
   </>
  )
}

export default HashTag