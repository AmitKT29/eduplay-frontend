import React, { useEffect, useState } from "react";
import "./Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  useEffect(() => {
    // Set body styles when the component is mounted
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.backgroundImage = 'url(/6758420.jpg)'; // Correct path
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundSize = 'cover';
    document.body.style.color = '#333';
    document.body.style.padding = '20px';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.margin = '0';

    // Cleanup: Reset styles when the component is unmounted
    return () => {
      document.body.style = '';  // Reset all body styles
    };
  }, []);

  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const[registerForm,setRegisterForm] = useState({
      fullname:'' , email:'' , password:'', confirmPassword:''
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
      ||registerForm.confirmPassword===''){

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
          const res = await fetch('http://localhost:5000/api/auth/register',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              name: registerForm.fullname,
              email: registerForm.email,
              password: registerForm.password,
            })
          })
          const data = await res.json()
          console.log(data)
          setLoading(false)
          if(data.token){
            toast.success('Registerd Successfully Please Login to Continue!!')
            setRegisterForm({
                 fullname:'' , email:'' , password:'', confirmPassword:''
            })
            setTimeout(()=>{
              navigate('/login')
            },4000)
          }else{
            toast.error(data.message)
            setRegisterForm({
               fullname:'' , email:'' , password:'', confirmPassword:''
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
        <div className="register-page-container">
          <h1>Welcome to EduPlay</h1>
          <p>Join us and make learning fun!</p>
          <form id="register-page-form" onSubmit={onRegister}>
            <div className="register-form-group">
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
            <div className="register-form-group">
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
            <div className="register-form-group">
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
            <div className="register-form-group">
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
            <button type="submit" id="register-button" value="Register">
              Register
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
