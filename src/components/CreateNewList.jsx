/* eslint-disable react/prop-types */

import { useRef } from "react";
import handleCreateListClick from "../handlers/handleCreateListClick";
const CreateNewList = ({ lists, updateLists, handleTaskCompletion }) => {
  const inputRef = useRef();

  return (
    <div className="border bg-zinc-900">
      <h3 className="py-2 font-semibold text-center border-b bg-zinc-700">
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
          onClick={() =>
            handleCreateListClick({
              lists,
              updateLists,
              inputRef,
              handleTaskCompletion,
            })
          }
          className="w-10 h-10 text-2xl font-semibold bg-zinc-700 rounded-full cursor-pointer hover:opacity-50 active:scale-90 transition-all"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CreateNewList;
