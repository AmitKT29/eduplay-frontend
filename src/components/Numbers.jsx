import React, { useEffect, useState, useRef, useCallback } from "react";
import lottie from "lottie-web";
import { useNavigate } from "react-router-dom"; // To handle page navigation
import "./Numbers.css";

export default function Numbers() {
  const animationContainerRef = useRef(null);
  const audioRef = useRef(null);
  const [animation, setAnimation] = useState(null);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to show/hide popup
  const navigate = useNavigate();
  const [isAnimationReady , setIsAnimationReady] = useState(false);
  const [isAudioReady , setIsAudioReady] = useState(false);

  useEffect(() => {
    // Set body styles when the component is mounted
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.display = "flex";
    document.body.style.flexDirection = "column";
    document.body.style.alignItems = "center";
    document.body.style.justifyContent = "center";
    document.body.style.height = "100vh";
    document.body.style.margin = "0";
    document.body.style.backgroundImage = "url(/6758420.jpg)";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";

    // Cleanup: Reset styles when the component is unmounted
    return () => {
      document.body.style = ""; // Reset all body styles
    };
  }, []);

  useEffect(() => {
    let loadedAnimation;

    const preloadMedia = async () => {
      try {
        // Fetch the animation JSON
        const animationResponse = await fetch(
          "https://my-animations-bucket.s3.eu-north-1.amazonaws.com/animations/1.json"
        );
        if (!animationResponse.ok) {
          throw new Error(
            `Failed to fetch animation JSON. Status: ${animationResponse.status}`
          );
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

        loadedAnimation.addEventListener("DOMLoaded" , ()=>{
          setIsAnimationReady(true);
        })

        // Add event listener for when animation finishes
        loadedAnimation.addEventListener("complete", () => {
          setIsAnimationComplete(true); // Mark the animation as complete
        });

        // Save the animation instance in state
        setAnimation(loadedAnimation);

        // Set the audio source
        audioRef.current.src =
          "https://my-animations-bucket.s3.eu-north-1.amazonaws.com/audios/1.mp3";

        audioRef.current.addEventListener("canplaythrough" , ()=>{
          setIsAudioReady(true);
        });
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
      if(audioRef.current){
        audioRef.current.removeEventListener("canplaythrough" , playAnimationAndAudio);
      }
    };
  }, []);

  const playAnimationAndAudio = useCallback(() => {

    if(!animation || !audioRef.current){
      return;
    }

    try {
      //audioRef.current.currentTime = 0; // Ensure the audio starts from the beginning
      //animation.goToAndStop(0, true); // Reset animation to the start
      /*audioRef.current
        .play()
        .then(() => {
          animation.play(); // Start the animation immediately after the audio starts
        })
        .catch((error) => {
          console.error("Error starting audio:", error);
        });*/

        if(isAnimationReady && isAudioReady){
          audioRef.current.currentTime = 0;
          audioRef.current.play().catch((error)=>console.log("Audio play error:" , error));

          animation.playSegments([0,10],true);
          animation.play();
        }
    } catch (error) {
      console.error("Error playing audio or animation:", error);
    }
  },[animation , isAnimationReady , isAudioReady]);

  useEffect(() => {
    if (isAnimationReady && isAudioReady) {
      playAnimationAndAudio();
    }
  }, [isAnimationReady, isAudioReady, playAnimationAndAudio]);

  const handleStartClick = () => {
    playAnimationAndAudio();
  };

  const handlePopupOkClick = () => {
    setShowPopup(false); // Hide the popup
    navigate("/puzzle"); // Navigate to the NumberPuzzle page
  };


  // Show the popup only after the animation has completed
  useEffect(() => {
    if (isAnimationComplete) {
      setTimeout(()=>{
        setShowPopup(true);// Trigger popup after animation is complete
      },500) 
    }
  }, [isAnimationComplete]);

  return (
    <div className="App">
      <div id="quiz-container">
        <div id="animation-container" ref={animationContainerRef}></div>
        <audio id="animation-audio" ref={audioRef} preload="auto"></audio>
      </div>

      <button id="start-button" onClick={handleStartClick}>
        Start
      </button>

      {/* Popup Section */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>It's game time!</h2>
            <button className="popup-button" onClick={handlePopupOkClick}>
              Let's Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
