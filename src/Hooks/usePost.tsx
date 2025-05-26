import axios from 'axios';
import React from 'react'

type UsePostProps = {
  url: string;
  data?: Record<string, any>;
};

export default function usePost({ url, data }: UsePostProps) {
  const [response, setResponse] = React.useState<any>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const postData = async () => {
    if (!data) {
      setError('Data is required');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!res.data) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.data;
      setResponse(result);
    } catch (err: any) {
      const errorMessage = err?.response?.data?.message || err.message || 'An unknown error occurred';
      setError(errorMessage);
    }
    finally {
      setLoading(false);
    }
  }

  return {
    response,
    error,
    loading,
    postData
  };
}
