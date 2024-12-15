import React, { useState, useEffect } from "react";
import "./Login.css"; // Ensure your CSS is correctly imported
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
    useEffect(() => {
      // Set body styles when the component is mounted
      document.body.style.display = 'flex';
      document.body.style.justifyContent = 'center';
      document.body.style.alignItems = 'center';
      document.body.style.height = '100vh';
      document.body.style.backgroundImage = 'url(/6516135.jpg)';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = 'cover';
  
      // Cleanup: Reset styles when the component is unmounted
      return () => {
        document.body.style = '';  // Reset all body styles
      };
    }, []);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    let user = localStorage.getItem("app-user");
    console.log(user);
    if (user) {
      navigate("/");
    }
  }, []);

  const onUserLogin = (e) => {
    e.preventDefault();
    if (loginForm.email === "" || loginForm.password === "") {
      toast.error("Enter Credentials !!");
      return;
    }
    setLoading(true);
    setTimeout(async () => {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.status === true) {
        toast.success(data.message);
        setTimeout(() => {
          localStorage.setItem("app-user", loginForm.email);
          navigate("/");
        }, 1500);
      } else {
        toast.error(data.message);
        if (data.message === "Invalid password") {
          setLoginForm({
            ...loginForm,
            password: "",
          });
        } else {
          setLoginForm({
            email: "",
            password: "",
          });
        }
      }
    }, 2000);
  };

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
      <div className="login-page-container">
        {/* Left Section */}
        <div className="login-welcome-section">
          <div className="login-illustration"></div>
        </div>

        {/* Right Section (Login Form) */}
        <div className="login-form-section">
          <div className="login-form-container">
            <h2>Login to your Account</h2>
            <p>Sign-In and Explore</p>
            <br />

            {/* Google Login Button */}
            <button className="login-google-button">
              <img
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="Google Icon"
              />
              Continue with Google
            </button>

            <p className="login-or-separator" style={{ color: "black" }}>
              or Sign in with Email
            </p>

            <form onSubmit={onUserLogin}>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => handleChange(e)}
                value={loginForm.email}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) => handleChange(e)}
                value={loginForm.password}
              />
              <div className="login-remember-forgot">
                <label className="login-remember-me">
                  <input type="checkbox" /> Remember Me
                </label>
                <a href="#">
                  <NavLink to={"/Forgot"}>Forgot Password?</NavLink>
                </a>
              </div>
              <button type="submit" name="login_btn">
                Login
              </button>
            </form>

            <p>
              New user??<NavLink to={"/Register"}>Create an account</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
