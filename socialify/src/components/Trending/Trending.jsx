import React from 'react';
import IndiNews from '../IndiNews/IndiNews';
import './trending.css';
const Trending = () => {
  return (
    <>
    <strong className='trendingTitleOuter'>What's Happening</strong>
    <hr />
    <IndiNews title={'Trending in India'} hashtag={'#cheems_is_opest '}/>
    <IndiNews title={'Trending in Sports'} hashtag={'#Messi_is_goat '}/>
    <IndiNews title={'Entertainment '} hashtag={'#transformers_are_back'}/>
    <IndiNews title={'Music'} hashtag={'Tera sooror best song Of the Year'}/>
    <IndiNews title={'News'} hashtag= {'Nora fatehi files case on jaqueleine'}/>

    </>
  )
}

export default Trending