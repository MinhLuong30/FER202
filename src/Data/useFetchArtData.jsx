import { useEffect, useState, useCallback } from 'react';

async function fetchData(setArt, setLoading, setError) {
  try {
    const response = await fetch('https://66938d8ec6be000fa07bfcd0.mockapi.io/MinhLTSE182480', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const data = await response.json();
    setArt(data);
    setLoading(false);
  } catch (error) {
    setError(error.message);
    setLoading(false);
  }
}

function useFetchArtData() {
  const [art, setArt] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchArtData = useCallback(() => fetchData(setArt, setLoading, setError), []);

  useEffect(() => {
    fetchArtData();
  }, [fetchArtData]);

  return { art, loading, error, fetchArtData };
}

export default useFetchArtData;
export { fetchData };
