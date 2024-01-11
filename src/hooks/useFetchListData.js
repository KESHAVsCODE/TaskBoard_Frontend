import { useEffect, useState } from "react";

const useFetchListData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lists, setLists] = useState([]);

  const fetchCryptoData = async () => {
    const apiUrl = `http://localhost:7000/list`;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message);
      }
      console.log(data);
      setLists(data?.userLists);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };
  const updateLists = (newLists) => {
    setLists(newLists);
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return { loading, lists, error, updateLists };
};

export default useFetchListData;
