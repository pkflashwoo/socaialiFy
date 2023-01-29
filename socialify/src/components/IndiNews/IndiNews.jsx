import React from 'react'
import './indiNews.css';
import { Link } from 'react-router-dom';
const IndiNews = ({title,hashtag}) => {
  return (
    <>
    <div className="indiNewsOuter">
        <Link to ={`/hashtag/${3515531}`}>

        <div className="topIndiNewsOuter">
        {title}
        </div>
        <div className="bottomIndiNewsOuter">
       {hashtag}
        </div>
        </Link>

    </div>
    </>
  )
}

export default IndiNews