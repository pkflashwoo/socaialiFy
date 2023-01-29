import React from 'react'
import './indiTrendingComp.css';
const IndiTrendingComp = ({index,hashtag}) => {
  return (
    <>
    <div className="indiTrendingCompOuter">
        <div className="upperIndiTrendingCompOuter">
            <small className='TrendingCompIndex'>{index?index:1} . Trending</small>
           
        </div>
        <div className="lowerIndiTrendingCompOuter">
            {hashtag?hashtag:'#Cheems_is_Op'}
        </div>

    </div>
    </>
  )
}

export default IndiTrendingComp