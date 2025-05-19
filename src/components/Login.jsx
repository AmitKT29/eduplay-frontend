import React, { useState, useEffect } from "react";
import "./Login.css"; // Ensure your CSS is correctly imported
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  useEffect(() => {
    // Set body styles when the component is mounted
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";
    document.body.style.backgroundImage = "url(/6516135.jpg)";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";

    // Cleanup: Reset styles when the component is unmounted
    return () => {
      document.body.style = ""; // Reset all body styles
    };
  }, []);

  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });


  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };
  

  useEffect(() => {
    if (location.pathname !== "/login") {
      return;
    }

    let user = localStorage.getItem("app-user-token");
    if (user) {
      navigate("/");
      return;
    }

    // Extract token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("app-user-token", token);
      toast.success("Login successful");

      // Remove token from URL after saving
      window.history.replaceState(null, "", "/login");

      navigate("/");
    } else {
      console.log("No token found");
    }
  }, [location.search]);
  
  
  

  const onUserLogin = (e) => {
    e.preventDefault();

    if (rememberMe) {
      localStorage.setItem("saved-email", loginForm.email);
      //localStorage.setItem("saved-password", loginForm.password);
    } else {
      localStorage.removeItem("saved-email");
      //localStorage.removeItem("saved-password");
    }

    if (loginForm.email === "" || loginForm.password === "") {
      toast.error("Enter Credentials !!");
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.token) {
        toast.success(data.message);
        setTimeout(() => {
          localStorage.setItem("app-user-token", data.token);
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
    }, 3000);
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
        <div className="fade" style={{ zIndex: 5 }}>
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
            <button className="login-google-button" onClick={googleLogin}>
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
                  <input
                    type="checkbox"
                    checked={rememberMe} // Bind checkbox to state
                    onChange={handleRememberMeChange}
                  />
                  Remember Me
                </label>
                <a href="#">
                  <NavLink to={"/forgot-password"}>Forgot Password?</NavLink>
                </a>
              </div>
              <button type="submit" name="login_btn">
                Login
              </button>
            </form>

            <p>
              New user??<NavLink to={"/register"}>Create an account</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
