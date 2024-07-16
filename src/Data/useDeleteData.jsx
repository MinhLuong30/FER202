import { useState } from 'react';

function useDeleteData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteData(id) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://66938d8ec6be000fa07bfcd0.mockapi.io/MinhLTSE182480/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Error deleting data");
      }
      setLoading(false);
      return true; 
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return false; 
    }
  }

  return { deleteData, loading, error };
}

export default useDeleteData;
