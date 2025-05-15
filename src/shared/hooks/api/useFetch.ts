import { useEffect, useState } from 'react';

export interface IUseFetchResponse<T> {
  data: T | undefined;
  error: unknown;
  loading: boolean;
}
const useFetch = <T>(url: string): IUseFetchResponse<T> => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
