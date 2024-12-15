import React, { useRef, useState } from "react";
import "./Homepage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const navigate=useNavigate();
  const swipeButtonRef=useRef(null);
  const swipeAreaRef=useRef(null);

  const [isDragging,setIsDragging]=useState(false);
  const [startX,setStartX]=useState(0);
  const [initialLeft,setInitialLeft]=useState(0);

  
  const handleMouseDown = (e) => {
    e.preventDefault();
    const swipeButton = swipeButtonRef.current;
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX); // Support touch devices
    setInitialLeft(parseInt(getComputedStyle(swipeButton).left, 10) || 0);
    swipeButton.style.transition = "none"; // Disable transition during dragging
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const moveX = (e.clientX || e.touches[0].clientX) - startX;
    const swipeButton = swipeButtonRef.current;
    const swipeArea = swipeAreaRef.current;

    const newLeft = initialLeft + moveX;
    const maxLeft = swipeArea.offsetWidth - swipeButton.offsetWidth;

    // Limit the movement within bounds
    if (newLeft >= 0 && newLeft <= maxLeft) {
      swipeButton.style.left = `${newLeft}px`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const swipeButton = swipeButtonRef.current;
    const swipeArea = swipeAreaRef.current;
    const maxLeft = swipeArea.offsetWidth - swipeButton.offsetWidth;

    setIsDragging(false);
    swipeButton.style.transition = "left 0.3s ease"; // Re-enable transition

    // Check if dragged past 60%
    const currentLeft = parseInt(swipeButton.style.left, 10) || 0;
    if (currentLeft > maxLeft * 0.6) {
      // Small delay to ensure navigation works after transition
      setTimeout(() => {
        navigate("/login");
      }, 300);
    } else {
      // Reset position if not dragged far enough
      swipeButton.style.left = "10px";
    }
  };
  const handleTouchStart=(e)=>{
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setInitialLeft(swipeButtonRef.current.offsetLeft);
    swipeButtonRef.current.style.transition="none";
  };

  const handleTouchMove=(e)=>{
    if(isDragging){
      const moveX=e.touches[0].clientX-startX;
      const swipeAreaWidth=swipeAreaRef.current.offsetWidth;
      const swipeButtonWidth=swipeButtonRef.current.offsetWidth;
      const newLeft=initialLeft+moveX;

      if(newLeft>=0 && newLeft <=swipeAreaWidth-swipeButtonWidth){
        swipeButtonRef.current.style.left=`${newLeft}px`;
      }
    }
  };

  const handleTouchEnd=()=>{
    handleMouseUp();
  }

  const handleLogOut=()=>{
    let user=localStorage.getItem("app-user")
    if(user){
      localStorage.removeItem("app-user")
      toast.warning("Logged Out!!");
    }else{
      toast.error("No User Logged In");
    }
  }

  const handleAlphabetCard=(e)=>{
    const user=localStorage.getItem("app-user");
    if(user){
      navigate("/animation");
    }else{
      toast.error("Login to Play");
    }
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
    <div className="container">
      <header>
        <div id="home" className="navbar">
          {/* Logo */}
          <div className="logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <div className="menu">
            <a href="#home" onClick={scrollToTop}>Home</a>
            <a href="#Programs">Programs</a>
            <a href="#pricing">Pricing</a>
            <a href="#Contact-Us">Contact us</a>
            <a href="#" className="enroll-btn"><NavLink to={"/register"}>Enroll Now</NavLink></a>
            <button id="logout-button" onClick={handleLogOut}>Log Out</button>
          </div>
        </div>
        <div className="login-container">
          <div className="swipe-area" ref={swipeAreaRef}>
            <div className="swipe-button"
                 id="swipeButton"
                 ref={swipeButtonRef}
                 onMouseDown={handleMouseDown}
                 onTouchStart={(e)=>handleMouseDown(e.touches[0])}
                 onTouchMove={(e)=>handleMouseMove(e.touches[0])}
                 onTouchEnd={handleMouseUp}
                 onMouseMove={handleMouseMove}
                 onMouseUp={handleMouseUp}
            >Swipe to the right to login</div>
          </div>
        </div>
      </header>

      <section className="hero" id="hero">
        <h1>Kids have fun you see <span>learning</span> <br /> progress.</h1>
        <p>Children experience fun while you observe tangible learning outcomes.</p>

        <div className="card-container">
          <div className="card">
            <img src="abc.gif" alt="Alphabet Bingo" className="card-image" />
            <h3 className="card-title">Alphabet BINGO</h3>
            <p className="card-subtitle">Grades PRE-K – K</p>
          </div>
          <div className="card" onClick={handleAlphabetCard}>
            <img src="1234.gif" alt="Alphabetical Order" className="card-image" />
            <h3 className="card-title">Counting Crew</h3>
            <p className="card-subtitle">Grades PRE-K – 1</p>
          </div>
          <div className="card">
            <img src="word sentence.gif" alt="Letter & Number Tracing" className="card-image" />
            <h3 className="card-title">Word Wizards</h3>
            <p className="card-subtitle">Grades PRE-K – 1</p>
          </div>
          <div className="card">
            <img src="shapes.gif" alt="Talk to Me Alphabet" className="card-image" />
            <h3 className="card-title">Fun-tastic Shapes</h3>
            <p className="card-subtitle">Grades PRE-K – K</p>
          </div>
        </div>
      </section>

      <div className="bg-images">
        <img src="new1.png" className="right" alt="Icon" />
        <img src="new2.png" className="bottom-left" alt="Icon" />
        <img src="new3.png" className="top-right" alt="Top Right Icon" />
        <img src="new4.png" className="middle-right" alt="Middle Right Icon" />
      </div>

      <section id="Programs">
      <div id="section-title">
      <h4>Check out our <span>programs</span>.</h4>
      <h5>Our courses are the stepping stones for your child's success.</h5>
      </div>
        <div className="card-container">
          <div className="card">
            <img src="penguincode.gif" alt="Penguin coding" className="card-image2" />
            <h3 className="card-title">Code Crafting for Kids</h3>
            <p className="card-subtitle">Grades PRE-K – K</p>
          </div>
          <div className="card">
            <img src="writing penguin.gif" alt="Dive into the world of imagination" className="card-image2" />
            <h3 className="card-title">Creative Writing & Storytelling</h3>
            <p className="card-subtitle">Grades PRE-K – 1</p>
          </div>
          <div className="card">
            <img src="science penguin.gif" alt="Explore the science" className="card-image2" />
            <h3 className="card-title">Science Explorers</h3>
            <p className="card-subtitle">Grades PRE-K – 1</p>
          </div>
          <div className="card">
            <img src="public speaking.gif" alt="Public speaking" className="card-image2" />
            <h3 className="card-title">Public Speaking Communication</h3>
            <p className="card-subtitle">Grades PRE-K – K</p>
          </div>
        </div>
      </section>

      <div className="bg-images2">
        <img src="top left.png" className="right2" alt="Icon" />
        <img src="bottom-left2.png" className="bottom-left2" alt="Icon" />
      </div>

      <section id="pricing">
        <img src="penguine-money.gif" alt="Education doesn’t need money" />
        <h4>
          Our prices are like air <br />
          absolutely <span>free and essential</span>
          <br /> for growth!
        </h4>
        <p>
          "The best things in life are free, including learning! Great education doesn’t have to
          come with a price tag. Start your child’s journey toward a brighter future{" "}
          <span>completely free of cost!</span>"
        </p>
      </section>

      <section id="Contact-Us">
        <div className="about-us-Card">
          <img src="penguine-phone.gif" alt="" />
          <h2>About Us</h2>
          <h1>Welcome to EduPlay – where learning meets fun!</h1>
          <p>
            At EduPlay, we make learning fun and exciting! Our interactive games, quizzes, and
            animations transform education into an adventure kids love. By blending play with
            knowledge, we spark curiosity and help kids unlock their true potential. <br />
            <span>Let’s make learning their favorite activity!</span>
          </p>
        </div>
        <div className="contact-us-card">
          <h2>"Have questions or need assistance? We're here to help!"</h2>
          <p>
            <span id="emp">
              📧 Email: halderavinandan9@gmail.com <br />
              📞 Phone: +91 9330260927
            </span>
          </p>
        </div>
      </section>
    </div>
    </>
  );
}
