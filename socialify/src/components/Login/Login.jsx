import React ,{useState}from 'react'
import './login.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const[userId,SetUserId]=useState('');
    const[password,SetPassword]=useState('');
   const navigate = useNavigate();
    const handleLogin= async(e) => {
        e.preventDefault();

        if(!userId||!password){
            alert('fill all the fields');
          }
          else{
            // const res =await fetch(`http://localhost:4000/socialify/user/login`,{
            //   method:"POST",
            //   headers:{
            //     "Content-Type":"application/json"
            //   },
            //   body:JSON.stringify({
              
            //     user_id:userId,
            //     password:password,
               
      
            //   })
          
            // })
            // axios.defaults.withCredentials = true;
            // const res=await axios.post('http://localhost:4000/socialify/user/login',JSON.stringify({
            //     user_id:userId,
            //     password:password,
            // }));

            const res=await axios({
              method: 'post',
              withCredentials : true,
              headers:{
                "Content-Type":"application/json"
              },
              url: 'http://localhost:4000/socialify/user/login',
              data: JSON.stringify({
                user_id:userId,
                password:password,
             })
            });
          
            const response = await res.data;
          
            if(response.success){
              console.log(response);
              console.log('ho gaya ' );

              navigate('/');
              
            }
            else{
              console.log(response);
              console.log('nahi hua ');
            }
          
          }
    }
  return (
    <div className="loginOuter">
       
        <div className="LoginText">
        <h3>Welcome Back To SocialiFy </h3>
        <hr />
        </div>
        <div className="inputFieldsLogin">
        <input required type="text" placeholder='id' onChange={e=>SetUserId(e.target.value)}/>
        <input required type="text" placeholder='password' onChange={e=>SetPassword(e.target.value)}/>
        </div>
        <div className="buttonToLogin">
           
        <button className="LoginSocalifyBtn" onClick={(e)=>handleLogin(e)}>Login</button>
        <div className="NewUserRegister">
            <Link to ='/register'>

            <strong>

        New ? Register to Socialify
            </strong>
            </Link>
        </div>
        
        </div>
    </div>
    )
}

export default Login