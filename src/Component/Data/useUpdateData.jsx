import { useState } from 'react';

function useUpdateData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function updateData(artId, updatedData) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://66938d8ec6be000fa07bfcd0.mockapi.io/MinhLTSE182480/${artId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Error updating data");
      }

      const data = await response.json();
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      return null;
    }
  }

  return { updateData, loading, error };
}

export default useUpdateData;
