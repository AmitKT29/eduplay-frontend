import React, { useState, useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export default function AnimationPage() {
  // State Management
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [resultReceived, setResultReceived] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // References
  const animationRef = useRef(null);
  const audioRef = useRef(null);

  // Preload Media
  useEffect(() => {
    const preloadMedia = async () => {
      
        try {
            // Fetch and load animation
            const response = await fetch('https://my-animations-bucket.s3.eu-north-1.amazonaws.com/animations/1.json');
            const animationData = await response.json();

            if (animationRef.current) {
                const animInstance = lottie.loadAnimation({
                    container: animationRef.current,
                    renderer: 'svg',
                    loop: false,
                    autoplay: false,
                    animationData,
                });

                animInstance.addEventListener('enterFrame', (event) => {
                    if (event.currentTime >= 385 && !isRecognizing && !resultReceived) {
                        stopAnimationAndAudio();
                    }
                });

                animInstance.addEventListener('error', (err) => {
                    console.error('Lottie animation error:', err);
                });
            }

            // Preload audio
            if (audioRef.current) {
                audioRef.current.src = 'https://my-animations-bucket.s3.eu-north-1.amazonaws.com/audios/1.mp3';
                audioRef.current.load();

                audioRef.current.addEventListener('canplaythrough', () => {
                    setAudioLoaded(true);
                });

                audioRef.current.addEventListener('error', () => {
                    console.error('Error loading audio');
                });
            }
        } catch (err) {
            console.error('Error preloading media:', err);
        }
    };

    preloadMedia();
}, []);


  // Start Animation
  const handleStartButtonClick = () => {
    setIsAnimationPlaying(true);
  };

  // Handle Feedback
  const handleFeedbackClose = () => {
    setIsFeedbackVisible(false);
    setResultReceived(false);
    setTimeout(() => {
      goToAndPlay(currentFrame, currentTime);
    }, 300);
  };

  // Speech Recognition Result
  const handleSpeechRecognitionResult = (isCorrect) => {
    if (isCorrect) {
      setFeedbackMessage('Great job you got it right!!');
    } else {
      setFeedbackMessage("Oops! That's incorrect. Try again!");
    }
    setIsFeedbackVisible(true);
    setResultReceived(true);
  };

  // Play Animation and Audio
  const playAnimationAndAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => console.error('Audio playback error:', error));
    }
    if (animationRef.current) {
      animationRef.current.play();
    }
  };

  // Stop Animation and Audio
  const stopAnimationAndAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (animationRef.current) {
      animationRef.current.pause();
    }
    if (animationRef.current) setCurrentFrame(animationRef.current.currentFrame);
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  // Go To and Play Specific Frame
  const goToAndPlay = (targetFrame, audioTime) => {
    if (audioRef.current) {
      audioRef.current.currentTime = audioTime;
      audioRef.current.play().catch((error) => console.error('Audio playback error:', error));
    }
    if (animationRef.current) {
      animationRef.current.goToAndPlay(targetFrame, true);
    }
  };

  // Speech Recognition Logic
  useEffect(() => {
    let recognition;
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.interimResults = false;

      recognition.addEventListener('error', (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'network') {
          alert('Speech recognition failed due to network issues. Please check your connection.');
        }
        setIsRecognizing(false);
      });

      recognition.addEventListener('result', (event) => {
        let finalText = '';
        Array.from(event.results).forEach((result) => {
          if (result.isFinal) {
            finalText = result[0].transcript.toLowerCase().trim();
            if (finalText === 'five children' || finalText === 'one') {
              handleSpeechRecognitionResult(true);
            } else {
              handleSpeechRecognitionResult(false);
            }
          }
        });
      });

      recognition.addEventListener('end', () => {
        setIsRecognizing(false);
      });

      if (isRecognizing) {
        recognition.start();
      } else {
        recognition.stop();
      }
    } else {
      console.warn('Speech recognition is not supported in this browser.');
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isRecognizing]);

  return (
    <div className="AnimationPage">
      {/* Start Button */}
      {!isAnimationPlaying && (
        <button onClick={handleStartButtonClick}>Start</button>
      )}

      {/* Animation Container */}
      <div
        id="quiz-container"
        className={`quiz-container ${isAnimationPlaying ? '' : 'blurred'}`}
      >
        {isAnimationPlaying && <div id="animation-container" />}
      </div>

      {/* Speech Recognition Button */}
      {isAnimationPlaying && (
        <button
          id="pushToTalkButton"
          onClick={() => setIsRecognizing(true)}
          style={{ display: 'block' }}
          aria-label="Activate Speech Recognition"
        >
          Push to Talk
        </button>
      )}

      {/* Feedback Message */}
      {isFeedbackVisible && (
        <div id="feedback">
          <p id="feedback-message">{feedbackMessage}</p>
          <button id="ok" onClick={handleFeedbackClose}>
            OK
          </button>
        </div>
      )}

      {/* Audio Element */}
      {isAnimationPlaying && audioLoaded && (
        <div>
          <audio
            ref={audioRef}
            preload="auto"
            onPlay={playAnimationAndAudio}
            onPause={stopAnimationAndAudio}
          />
        </div>
      )}
    </div>
  );
}
