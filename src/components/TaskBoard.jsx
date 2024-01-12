import CreateNewList from "./CreateNewList";
import List from "./List";
import { DragDropContext } from "react-beautiful-dnd";
import handleDragDropEvent from "../utils/handleDragDropEvent";
import { useContext } from "react";

import UserContext from "../context/UserContextProvider";
import { useNavigate } from "react-router-dom";

import useFetchListData from "../hooks/useFetchListData";

const TaskBoard = () => {
  const { user, setUser } = useContext(UserContext);

  const { lists, updateLists, error, loading } = useFetchListData();
  const navigate = useNavigate();

  if (!user.userId) return navigate("/login");

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center">{error}</p>;

  const logoutUser = () => {
    setUser({
      userName: "",
      userId: "",
    });
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <header className="p-4 flex justify-between bg-gray-700">
        <p className="text-2xl font-medium">Welcome {user.userName}</p>
        <button
          onClick={logoutUser}
          className="px-4 py-1 bg-blue-500 font-semibold rounded-lg hover:opacity-50 active:scale-90 transition-all"
        >
          Logout
        </button>
      </header>
      <div className="h-[480px] m-4 p-4 flex gap-4 bg-extraLightBlack overflow-x-auto">
        <DragDropContext
          onDragEnd={(results) =>
            handleDragDropEvent(results, lists, updateLists)
          }
        >
          {lists?.map((list, index) => (
            <List
              key={list.listId}
              list={list}
              listIndex={index}
              lists={lists}
              updateLists={updateLists}
            />
          ))}
        </DragDropContext>
        <CreateNewList lists={lists} updateLists={updateLists} />
      </div>
    </div>
  );
};

export default TaskBoard;
