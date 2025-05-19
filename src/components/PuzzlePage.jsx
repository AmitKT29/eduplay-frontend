import React, { useEffect, useState } from 'react';

function PuzzlePage() {
  const [currentPuzzle, setCurrentPuzzle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = 'user123'; // Replace this dynamically if needed
    const apiUrl = `http://127.0.0.1:5000/recommend?userId=${userId}`;

    const fetchRecommendation = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.recommendations && data.recommendations.length > 0) {
          setCurrentPuzzle(data.recommendations[0]); // Use the first recommendation
        } else {
          console.warn('No recommendations received');
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, []);

  if (loading) return <p>Loading recommendation...</p>;
  if (!currentPuzzle) return <p>No puzzle found.</p>;

  //const puzzleUrl = `https://gameslevel.s3.eu-north-1.amazonaws.com/${currentPuzzle.puzzleName}-level-${currentPuzzle.level}.html`;
  const puzzleUrl = `https://gameslevel.s3.eu-north-1.amazonaws.com/alphabets-puzzle-level-1.html`;
  console.log(puzzleUrl)

  return (
    <div>
      <h2>Recommended Puzzle</h2>
      <iframe
        src={puzzleUrl}
        title="Puzzle"
        width="100%"
        height="700px"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default PuzzlePage;
