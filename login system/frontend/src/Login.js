import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Validation from './LoginValidation';
import axios from 'axios'
import logo from './logo.png'

function Login() {
    const [values, setValues] = useState({
        email:'',
        password:''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput = (event) =>{
        setValues(prev =>({...prev,[event.target.name]:[event.target.value]}))
    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.email === "" && errors.password === ""){
            axios.post("http://localhost:8081/login", values).then(
                res => {
                    if(res.data === "Success"){
                        navigate('/home');
                    }else{
                        alert("No record existed");
                        console.log(res.data)
                    }
                }).catch(err => console.log(err))
        }
    }

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='shadow-lg bg-body bg-white p-3 rounded w-25'>
            <img className="d-block mx-auto" src={logo} alt="logo" />
            <form action="" onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="email"><strong>E-mail</strong></label>
                    <input type="email" placeholder='請輸入 E-mail' name='email' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'>
                    <label htmlFor="password"><strong>密碼</strong></label>
                    <input type="password" placeholder='請輸入密碼' name='password' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0' style={{background:"#35A996"}}><strong>登入</strong></button>
                <p></p>
                <p style={{textAlign: "center"}}>忘記密碼？</p>
                <p style={{textAlign: "center"}}>還沒註冊嗎？ <Link to="/signup" className='btn btn-default border-0 text-warning rounded-0 text-decoration-none'><strong>註冊</strong></Link></p>
            </form>
        </div>
    </div>
  )
}

export default Login