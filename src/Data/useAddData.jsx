import { useState } from 'react';

function useAddArt() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const addArt = async (art) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log(art);

    try {
      const response = await fetch('https://66938d8ec6be000fa07bfcd0.mockapi.io/ArtTools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(art),
      });

      if (!response.ok) {
        throw new Error('Error adding art');
      }

      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { addArt, loading, error, success };
}

export default useAddArt;
