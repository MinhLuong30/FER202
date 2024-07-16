import { useState, useEffect, useCallback } from 'react';

async function fetchArtById(id, setLoading, setError) {
  try {
    const response = await fetch(`https://66938d8ec6be000fa07bfcd0.mockapi.io/MinhLTSE182480/${id}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error("Error fetching student data");
    }
    const data = await response.json();
    setLoading(false);
    return data;
  } catch (error) {
    setError(error.message);
    setLoading(false);
    throw error;
  }
}

function useFetchArtDataById(id) {
  const [art, setArt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArt = useCallback(() => {
    setLoading(true);
    fetchArtById(id, setLoading, setError).then(data => setArt(data));
  }, [id]);

  useEffect(() => {
    fetchArt();
  }, [fetchArt]);

  return { art, loading, error };
}

export default useFetchArtDataById;
