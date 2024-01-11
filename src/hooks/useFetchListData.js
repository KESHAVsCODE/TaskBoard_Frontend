import { useEffect, useState } from "react";

const useFetchListData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listsData, setListsData] = useState({});

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
      setListsData(data?.data);
      setLoading(false);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

  return { loading, listsData, error };
};

export default useFetchListData;
