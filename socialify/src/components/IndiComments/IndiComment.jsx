import React from 'react'
import './indicomment.css';
import Avatar from '../Avatar/Avatar';
import {Link} from 'react-router-dom';
const IndiComment = ({text}) => {



//  const [comments,SetComments]=useState({});



  return (
    <>
        <div className="commentsFullPost">
        
        <div className="fullPostCommentLeft">
        <Link to={'/profile/cheemsOp'}>
            <Avatar imgUrl={'https://th.bing.com/th/id/OIP.4DDpf8C8vq0uXAdyoPJhvwHaIt?pid=ImgDet&rs=1'}/>
        </Link>
        </div>
        <div className="fullPostCommentRight">
        <div className="postUserName">
          <Link to={'/profile/cheemsOp'}>
            <strong>CheemsOpest</strong>
          </Link>
            </div>
            
        {text?text:'#CheemsInu WILL TAKE OVER THE MEMECOIN MARKET SOON. BE PREPARED 💰💰💰💰 FILL YOUR BAGS UP'}
        </div>
    
        </div>
    
    </>
  )
}

export default IndiComment