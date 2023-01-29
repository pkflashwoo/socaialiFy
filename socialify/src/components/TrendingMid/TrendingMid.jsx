import React from 'react'
import IndiTrendingComp from '../IndiTrendingComp/IndiTrendingComp'
import { Link } from 'react-router-dom'
import leftArrow from '../../assets/symbols/leftArrow.svg'
import './trendingMid.css'
const TrendingMid = () => {
    let arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  return (
    <>
    <div className="trendingMidOuter">
        <div className="trendingMidUpper">
        <div className="navAndUserName">
                <Link to={'/'} >

                <img className='navLeftArrow'  src={leftArrow} alt="lol" />
                </Link>
                <div className="navTextWraaper">

                <strong className='navUserName'>
                    Trending      
                    </strong>
                   
                </div>
            </div> 
        </div>
        <div className="trendingMidLower">
           {
            arr.map((index)=>{
                return(<>
                <IndiTrendingComp index={index}/>
                
                </>)
            })
           }

        </div>
    </div>
    </>
  )
}

export default TrendingMid