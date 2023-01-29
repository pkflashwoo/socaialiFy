import React,{useState} from 'react'
import './register.css';
import { useNavigate } from 'react-router-dom';
const Register = () => {
  const navigate = useNavigate();
  const[handleName,SetHandlename] =useState('');
  const[displayName,SetDisplayName]=useState('');
  const[email,SetEmail]=useState('');
  const[bio,SetBio]=useState('');
  const[password,SetPassword]=useState('');
 // const[dpUrl,SetDpUrl]=useState('');
  const defaultUrl ='https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1-1024x1024.jpg';

  const createUser =async(e)=>{
    e.preventDefault();

    if(!handleName||!displayName||!email||!bio||!password){
      alert('fill all the fields');
    }
    else{
      const res =await fetch(`http://localhost:4000/socialify/user/new`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          username:displayName,
          user_id:handleName,
          password:password,
          user_bio:bio,
          user_pfp: {
            url:defaultUrl
          }

        })
    
      })
    
      const response = await res.json();
    
      if(response.success){
        console.log(response);
        console.log('ho gaya ' );
        navigate('/login')
      }
      else{
        console.log(response);
        console.log('nahi hua ');
      }
    
    }


  }
  
  return (
    <>
    <div className="registerOuter">
    <div className="RegisterText">
        <h3>Join SocialiFy </h3>
        <hr />
        </div>
        <div className="inputFieldsRegister">

        <input type="text" placeholder='Choose Your Handle Name' onChange={(e)=>{SetHandlename(e.target.value)}} />
        <input type="text" placeholder='Choose Your Display Name' onChange={(e)=>{SetDisplayName(e.target.value)}} />
        <input type="text" placeholder='Email'  onChange={(e)=>{SetEmail(e.target.value)}}  />
        <input type="text" placeholder='Password' onChange={(e)=>{SetPassword(e.target.value)}} />
        <input type="text" placeholder='About You' onChange={(e)=>{SetBio(e.target.value)}} />
        <div className="dpAndJoinBtn">
            
        <label class="label">
        <input className="tweetBoxLowerBelowFile" type="file" />
        <span>Display Picture</span>
      </label>
        <button className='registeSocialifyBtn' onClick={(e)=>createUser(e)}>Join</button>
        </div>

        
        </div>
    </div>
    
    
    </>
  )
}

export default Register