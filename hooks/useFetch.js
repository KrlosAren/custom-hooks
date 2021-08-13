import { useEffect, useRef, useState } from 'react';

const useFetch = (url = 'https://www.breakingbadapi.com/api/') => {
  const isMounted = useRef(true);

  const [data, setData] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setData({
      loading: true,
      data: null,
      error: null,
    });

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (isMounted.current) {
          setData({
            data,
            loading: false,
            error: null,
          });
        } else {
          console.log('set state no se llamo');
        }
      })
      .catch((error) => {
        setData({
          ...data,
          error: error,
        });
      });
  }, [url]);

  return data;
};

export default useFetch;
