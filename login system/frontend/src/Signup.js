import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
import logo from './logo.png'

function Signup() {
    const [values, setValues] = useState({
        status:'',
        name:'',
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
        const err = (Validation(values));
        setErrors(err);
        if(errors.name === "" && errors.email === "" && errors.password === "" && errors.check_password === ""){
            axios.post("http://localhost:8081/signup", values).then(
                res => {
                    navigate('/');
                }).catch(err => console.log(err))
        }

    }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='bg-white bg-body shadow-lg p-3 rounded w-25'>
            <form action="" onSubmit={handleSubmit}>
            <img className="d-block mx-auto" src={logo} alt="logo" />
            {/* <div className='mb-3'>
                    <label htmlFor="status"><strong>身分</strong></label>
                    <input type="text" placeholder='請輸入身分（0=消費者 or 1=商家）' name='status' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.status && <span className='text-danger'>{errors.status}</span>}
                </div> */}
            <div className='mb-3'>
                    <label htmlFor="name"><strong>名稱</strong></label>
                    <input type="text" placeholder='請輸入名稱' name='name' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
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
                <div className='mb-3'>
                    <label htmlFor="check_password"><strong>再次確認密碼</strong></label>
                    <input type="password" placeholder='再次確認密碼' name='check_password' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.check_password && <span className='text-danger'>{errors.check_password}</span>}
                </div>
                <button type='submit' className='btn btn-success w-100 rounded-0' style={{background:"#35A996"}}><strong>註冊</strong></button>
                <p></p>
                <Link to="/" className='btn btn-default border-0 bg-light rounded-0 w-100 text-center'><strong><u> 返回登入</u></strong></Link>
            </form>
        </div>
    </div>
  )
}

export default Signup