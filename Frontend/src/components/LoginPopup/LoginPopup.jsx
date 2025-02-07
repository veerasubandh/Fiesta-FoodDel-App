import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({setShowLogin}) => {

  const {url,setToken} = useContext(StoreContext)
  const [currentState,setCurrentState] = useState("Login")
    const [data,setData] = useState({
      name:"",
      email:"",
      password:"",
    })

    const onChangeHandler = (event) => {
      const {name,value} = event.target
      setData(data=>({...data,[name]:value}))
    }

    const onLogin = async(event) =>{
      event.preventDefault()
      let newUrl = url;
      if(currentState === "Login"){
        newUrl += "/api/user/login"
      }else{
        newUrl += "/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem("token",response.data.token)
        setShowLogin(false);
      }else{
        alert(response.data.message)
      }
    }

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="login-popup-title">
            <h2>{currentState}</h2>
            <img src={assets.cross_icon} onClick={()=>setShowLogin(false)} alt="Close" />
        </div>
        <div className='login-popup-inputs'>
            {currentState==='Login'?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Enter Name' required/>}
            
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Email ID' required/>
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Enter Password' required/>

        </div>
        <button type='submit'>{currentState==='Sign Up'?'Create Account':'Login'}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the terms of use and privacy policy.</p>
        </div>
        {currentState==='Login'?<p>Create a new account? <span onClick={()=>setCurrentState('Sign Up')}>Click Here!</span> </p>:
        <p>Already have an account? <span onClick={()=>setCurrentState('Login')}>Login from Here!</span></p>}
        
      </form>
    </div>
  )
}

export default LoginPopup
