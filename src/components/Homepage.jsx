import React from "react";
import "./Homepage.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Homepage(){
    const navigate = useNavigate();

    const handleCardClick=()=>{
      let user=localStorage.getItem('app-user')
      if(user){
        navigate("/animation");
      }else{
        toast.error("Please Login to play!!")
      }
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
        <div>
          <header>
            <div className="navbar">
              {/* Logo */}
              <div className="logo">
                <img src="logo.png" alt="Logo" />
              </div>
              <div className="menu">
                <a href="#">Home</a>
                <a href="#">Programs</a>
                <a href="#">Resources</a>
                <a href="#">Pricing</a>
                <a href="#" className="enroll-btn">
                  <NavLink to={"/login"}>Enroll Now</NavLink>
                </a>
              </div>
            </div>
          </header>

          <main>
            <section className="hero">
              <h1>
                Kids have fun you see <span>learning</span> <br /> progress.
              </h1>
              <p>
                Children experience fun while you observe tangible learning
                outcomes.
              </p>

              <div className="card-container">
                <div className="card">
                  <img
                    src="abc.gif"
                    alt="Alphabet Bingo"
                    className="card-image"
                  />
                  <h3 className="card-title">Alphabet BINGO</h3>
                  <p className="card-subtitle">Grades PRE-K – K</p>
                </div>
                <div className="card" id="counting-crew" onClick={handleCardClick}>
                  <img
                    src="1234.gif"
                    alt="Counting Crew"
                    className="card-image"
                  />
                  <h3 className="card-title">Counting Crew</h3>
                  <p className="card-subtitle">Grades PRE-K – 1</p>
                </div>
                <div className="card">
                  <img
                    src="word sentence.gif"
                    alt="Word Wizards & Sentence Sorcerers"
                    className="card-image"
                  />
                  <h3 className="card-title">
                    Word Wizards & Sentence Sorcerers
                  </h3>
                  <p className="card-subtitle">Grades PRE-K – 1</p>
                </div>
                <div className="card">
                  <img
                    src="shapes.gif"
                    alt="Fun-tastic Shapes"
                    className="card-image"
                  />
                  <h3 className="card-title">Fun-tastic Shapes</h3>
                  <p className="card-subtitle">Grades PRE-K – K</p>
                </div>
              </div>
            </section>

            {/* Background Images */}
            <div className="bg-images">
              <img src="new1.png" className="right" alt="Icon" />
              <img src="new2.png" className="bottom-left" alt="Icon" />
              {/* New images */}
              <img src="new3.png" className="top-right" alt="Top Right Icon" />
              <img
                src="new4.png"
                className="middle-right"
                alt="Middle Right Icon"
              />
            </div>
          </main>
        </div>
      </>
    );
};