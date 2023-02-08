import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // useCallback returns a memoized (cached) version of a function 
  // that only changes if one or more of its dependencies have changed. 
  // This can help to prevent unnecessary re-renders of components that use this function.

  // In this case, since useEffect in App has dependency of sendRequest, not using useCallback will result in infinite loop

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }
      console.log('data fetched')
      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  },[]);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
