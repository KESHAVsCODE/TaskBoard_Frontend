/* eslint-disable react/prop-types */
// listsDataContext.js
import { createContext } from "react";
import useFetchListData from "../hooks/useFetchListData";

const ListsDataContext = createContext();

export const ListsDataContextProvider = ({ children }) => {
  const { lists, updateLists, error, loading } = useFetchListData();

  return (
    <ListsDataContext.Provider value={{ lists, loading, error, updateLists }}>
      {children}
    </ListsDataContext.Provider>
  );
};

export default ListsDataContext;
