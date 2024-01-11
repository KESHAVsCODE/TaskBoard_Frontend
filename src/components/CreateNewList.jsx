import { useContext, useRef } from "react";
import ListsDataContext from "../context/listsDataContextProvider";

const CreateNewList = () => {
  const inputRef = useRef();
  const { lists, updateLists } = useContext(ListsDataContext);

  const handleCreateListClick = async () => {
    const userId = "c3e75a36-143c-4f64-bf57-8dfc84cd17d1";
    const listName = inputRef.current.value;
    if (!listName) return;
    console.log(listName);
    inputRef.current.value = "";
    try {
      const response = await fetch("http://localhost:7000/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName, userId }),
      });
      const data = await response.json();
      const newList = {
        listName: data.list.listName,
        listId: data.list.listId,
        tasks: [],
      };
      updateLists([...lists, newList]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border">
      <h3 className="font-semibold text-center border-b py-2">
        Create New List
      </h3>
      <div className="p-4 flex gap-2">
        <input
          ref={inputRef}
          type="text"
          placeholder="List name"
          className="p-2 flex-grow"
        />
        <button
          onClick={handleCreateListClick}
          className="w-10 h-10 text-2xl font-semibold bg-gray-500 rounded-full cursor-pointer hover:opacity-50 active:scale-90 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CreateNewList;
