/* eslint-disable react/prop-types */

import { useRef } from "react";

const CreateNewList = ({ lists, updateLists }) => {
  const inputRef = useRef();

  const handleCreateListClick = async () => {
    const listName = inputRef.current.value;
    if (!listName) return;
    console.log(listName);
    inputRef.current.value = "";
    try {
      const response = await fetch("http://localhost:7000/list/create", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName }),
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
