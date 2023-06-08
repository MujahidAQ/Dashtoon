import { useEffect, useState } from "react"

const useNetwork = (url) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [error, seterror] = useState(null)

  const fetchApi = () => {
    fetch(url) 
    .then(response => {
      setLoading(false)
      setData(response)
    })
    .catch(err => {
      seterror(err)
    })
  };

  useEffect(() => {
    fetchApi();
  }, []);

  return { loading, data, error }
};

export default useNetwork;