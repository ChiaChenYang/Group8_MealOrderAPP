import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
import logo from '../image/logo.png'

function Signup() {
    const [values, setValues] = useState({
        name:'',
        division:'',
        position:'',
        email:'',
        password:'',
        check_password:''
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
        if(errors.name === "" && errors.division === "" && errors.position === "" && errors.email === "" && errors.password === "" && errors.check_password === ""){
            axios.post("http://localhost:8081/signup", values).then(
                res => {
                    navigate('/');
                }).catch(err => console.log(err))
        }

    }
  return (
    <div className='d-flex justify-content-center vh-100' style={{backgroundColor:"rgb(255, 254, 253)"}}>
        <div style={{position:'absolute',top:'5%'}}>
            <form action="" onSubmit={handleSubmit} class="row">
            <img className="d-block mx-auto " src={logo} alt="logo" style={{width:240}}/>
            {/* <div className='mb-3'>
                    <label htmlFor="status"><strong>身分</strong></label>
                    <input type="text" placeholder='請輸入身分（0=消費者 or 1=商家）' name='status' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.status && <span className='text-danger'>{errors.status}</span>}
                </div> */}
            <div className='mb-2'>
                    <label htmlFor="name"><strong>名稱</strong></label>
                    <input type="text" placeholder='請輸入名稱' name='name' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div className='col-md-6 mb-2'>
                    <label htmlFor="division"><strong>單位</strong></label>
                    <input type="text" placeholder='輸入您所屬的單位' name='division' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.division && <span className='text-danger'>{errors.division}</span>}
                </div>
                <div className='col-md-6'>
                <label htmlFor="position"><strong>職稱</strong></label>
                    <input type="text" placeholder='請輸入職稱' name='position' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.position && <span className='text-danger'>{errors.position}</span>}
                </div>
                <div className='mb-2'>
                    <label htmlFor="email"><strong>E-mail</strong></label>
                    <input type="email" placeholder='請輸入 E-mail' name='email' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-2'>
                    <label htmlFor="password"><strong>密碼</strong></label>
                    <input type="password" placeholder='請輸入密碼' name='password' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div className='mb-2'>
                    <label htmlFor="check_password"><strong>再次確認密碼</strong></label>
                    <input type="password" placeholder='再次確認密碼' name='check_password' onChange={handleInput} className='form-control  rounded 0'/>
                    {errors.check_password && <span className='text-danger'>{errors.check_password}</span>}
                </div>
                <button type='submit' className='btn btn-success rounded mx-auto' style={{background:"#35A996",width:"94%"}}><strong>註冊</strong></button>
                <p></p>
                <Link to="/" className='btn btn-default border-0 rounded text-center mx-auto' style={{backgroundColor:"rgb(240, 240, 240)",width:"94%"}}><strong>返回登入</strong></Link>
            </form>
        </div>
    </div>
  )
}

export default Signup