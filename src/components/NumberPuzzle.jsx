import React, { useEffect, useState } from "react";
import "./NumberPuzzle.css";

const NumberPuzzle = () => {
  const initialNumbers = Array.from({ length: 9 }, (_, i) => i + 1); // Numbers 1-9
  const [shuffledNumbers, setShuffledNumbers] = useState(shuffleArray([...initialNumbers])); // Shuffle numbers
  const [points, setPoints] = useState(0); // Points system
  const [draggedIndex, setDraggedIndex] = useState(null); // Index of the dragged number

  useEffect(() => {
    // Set body styles when the component is mounted
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#f3f4f6";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
    document.body.style.height = "100vh";

    // Cleanup: Reset styles when the component is unmounted
    return () => {
      document.body.style.fontFamily = "";
      document.body.style.margin = "";
      document.body.style.padding = "";
      document.body.style.backgroundColor = "";
      document.body.style.display = "";
      document.body.style.justifyContent = "";
      document.body.style.alignItems = "";
      document.body.style.height = "";
    };
  }, []); // Empty dependency array to run only once on mount and unmount


  // Shuffle array function
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Handle drag start
  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  // Handle drag over (required for dropping)
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (targetIndex) => {
    if (draggedIndex === null) return;

    const draggedNumber = shuffledNumbers[draggedIndex];
    const correctNumberForTargetIndex = targetIndex + 1; // Correct number for the target position

    // Swap numbers
    const updatedNumbers = [...shuffledNumbers];
    [updatedNumbers[draggedIndex], updatedNumbers[targetIndex]] = [
      updatedNumbers[targetIndex],
      updatedNumbers[draggedIndex],
    ];
    setShuffledNumbers(updatedNumbers);

    // Points Logic
    if (draggedNumber === correctNumberForTargetIndex) {
      // Correct placement
      setPoints(points + 10); // Add points for correct placement
    } else {
      // Incorrect placement
      setPoints(points - 10); // Deduct points for incorrect placement
    }

    setDraggedIndex(null); // Reset dragged index
  };

  // Reset game
  const resetGame = () => {
    setShuffledNumbers(shuffleArray([...initialNumbers]));
    setPoints(0);
    setDraggedIndex(null);
  };

  return (
    <div className="puzzle-container">
      <h1>Number Puzzle Game</h1>
      <p className="instructions">
        Drag and drop the numbers into the correct order (1-9). Earn points for correct placement and lose points for incorrect placement!
      </p>
      <div className="points">Points: {points}</div>
      <div className="puzzle-grid">
        {shuffledNumbers.map((number, index) => {
          const isCorrect = number === index + 1; // Check if the number is in the correct position
          return (
            <div
              key={index}
              className={`puzzle-tile ${isCorrect ? "correct" : "wrong"}`} // Add "correct" or "wrong" class
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(index)}
            >
              {number !== null && (
                <div
                  className="draggable-number"
                  draggable
                  onDragStart={() => handleDragStart(index)}
                >
                  {number}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <button className="reset-button" onClick={resetGame}>
        Restart Game
      </button>
    </div>
  );
};

export default NumberPuzzle;
