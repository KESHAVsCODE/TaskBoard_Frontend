import { useEffect, useState } from "react";

const useFetchListData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lists, setLists] = useState([]);

  const fetchCryptoData = async () => {
    const apiUrl = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/list`;
    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiUrl, {
        method: "GET",
        credentials: "include",
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message);
      }
      console.log(data);
      setLists(data?.data);
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
