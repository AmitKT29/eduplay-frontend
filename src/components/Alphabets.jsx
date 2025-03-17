import React, { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { useNavigate } from 'react-router-dom'; // To handle page navigation
import './Alphabets.css';

export default function Alphabets(){
  const animationContainerRef = useRef(null);
  const audioRef = useRef(null);
  const [animation, setAnimation] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const navigate = useNavigate(); // Hook to navigate to another page
  
  // Set the desired speeds for animation and audio
  const audioSpeed = 1; // Audio speed (0.5 for slower, 1 for normal, 1.5 for faster)
  const animationSpeed = 1.2; // Animation speed (1 for normal, >1 for faster, <1 for slower)

  useEffect(() => {
    // Dynamically set the background image when the component mounts
    document.body.style.backgroundImage = "url('/7572122.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cleanup: Reset the background styles when the component is unmounted
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundPosition = "";
      document.body.style.backgroundRepeat = "";
    };
  }, []);

  useEffect(() => {
    let loadedAnimation;
    
    const preloadMedia = async () => {
      try {
        // Fetch the animation JSON
        const animationResponse = await fetch(
          "https://my-animations-bucket.s3.eu-north-1.amazonaws.com/animations/2.json"
        );
        if (!animationResponse.ok) {
          throw new Error(`Failed to fetch animation JSON. Status: ${animationResponse.status}`);
        }
        const animationData = await animationResponse.json();
  
        // Clear the container before loading a new animation
        if (animationContainerRef.current) {
          animationContainerRef.current.innerHTML = ""; // Clear any existing animations
        }
  
        // Load the new animation
        loadedAnimation = lottie.loadAnimation({
          container: animationContainerRef.current,
          renderer: "svg",
          loop: false,
          autoplay: false,
          animationData,
        });
        
        // Set the playback speed for the animation
        loadedAnimation.setSpeed(animationSpeed);

        // Add event listener for when animation finishes
        loadedAnimation.addEventListener("complete", () => {
          setIsAnimationComplete(true);
        });
  
        // Save the animation instance in state
        setAnimation(loadedAnimation);
  
        // Set the audio source
        audioRef.current.src = "https://my-animations-bucket.s3.eu-north-1.amazonaws.com/audios/2.mp3";
        
        // Adjust the audio playback rate (speed)
        audioRef.current.playbackRate = audioSpeed;

      } catch (error) {
        console.error("Error loading media:", error);
      }
    };
  
    preloadMedia();
  
    return () => {
      // Cleanup animation instance
      if (loadedAnimation) {
        loadedAnimation.destroy();
      }
    };
  }, [audioSpeed, animationSpeed]);

  const playAnimationAndAudio = () => {
    try {
      audioRef.current.currentTime = 0; // Ensure the audio starts from the beginning
      animation.goToAndStop(0, true); // Reset animation to the start
      audioRef.current.play().then(() => {
        animation.play(); // Start the animation immediately after the audio starts
      }).catch(error => {
        console.error("Error starting audio:", error);
      });
    } catch (error) {
      console.error("Error playing audio or animation:", error);
    }
  };
  
  const handleStartClick = () => {
    playAnimationAndAudio();
  };

  // Redirect to another page after animation and audio complete
  useEffect(() => {
    if (isAnimationComplete) {
      // Wait for a brief moment after animation completion to ensure smooth transition
      setTimeout(() => {
        navigate('/nextPage'); // Redirect to another page
      }, 500); // Adjust timing if needed
    }
  }, [isAnimationComplete, navigate]);

  return (
    <div className="App">
      <div id="quiz-container">
        <div id="animation-container" ref={animationContainerRef}></div>
        <audio id="animation-audio" ref={audioRef} preload="auto"></audio>
      </div>

      <button id="start-button" onClick={handleStartClick}>Start</button>
    </div>
  );
};
