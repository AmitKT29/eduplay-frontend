import React, { useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const[registerForm,setRegisterForm] = useState({
      fullname:'' , email:'' , password:'', confirmPassword:'' , favSubject:''
  })

  const handleChange = (e) =>{
    setRegisterForm({
      ...registerForm,
      [e.target.name]:e.target.value
    })
  }

  const onRegister=async(e)=>{
    e.preventDefault();
    if(registerForm.fullname===''||registerForm.email===''||registerForm.password===''
      ||registerForm.confirmPassword===''||registerForm.favSubject===''){

        toast.error("Enter your details!!");
        return;
      }
      if(registerForm.password!==registerForm.confirmPassword){
        toast.error("Password does not match !!");
        setRegisterForm({
          ...registerForm,
          password:'',
          confirmPassword:''
        })
        return
      }
      setLoading(true)
      setTimeout(async() => {
          const res = await fetch('http://localhost:8080/register',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify(registerForm)
          })
          const data = await res.json()
          console.log(data)
          setLoading(false)
          if(data.status===true){
            toast.success('Registerd Successfully !!')
            setRegisterForm({
                 fullname:'' , email:'' , password:'', confirmPassword:'' , favSubject:''
            })
            setTimeout(()=>{
              navigate('/')
            },2000)
          }else{
            toast.error(data.message)
            setRegisterForm({
               fullname:'' , email:'' , password:'', confirmPassword:'' , favSubject:''
            })
          }
      }, 3000);
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {loading && (
        <div className="fade">
          <div className="box"></div>
        </div>
      )}
      <main>
        <div className="register-container">
          <h1>Welcome to EduPlay</h1>
          <p>Join us and make learning fun!</p>
          <form id="register-form" onSubmit={onRegister}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="fullname"
                placeholder="Enter your full name"
                onChange={(e)=>handleChange(e)}
                value={registerForm.fullname}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e)=>handleChange(e)}
                value={registerForm.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter a password"
                onChange={(e)=>handleChange(e)}
                value={registerForm.password}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={(e)=>handleChange(e)}
                value={registerForm.confirmPassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subjects">Favorite Subject</label>
              <select id="subjects" name="favSubject" onChange={(e)=>handleChange(e)} value={registerForm.favSubject}>
                <option value="math">Math</option>
                <option value="science">Science</option>
                <option value="history">History</option>
                <option value="arts">Arts</option>
              </select>
            </div>
            <button type="submit" id="register-button" value="Register">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
