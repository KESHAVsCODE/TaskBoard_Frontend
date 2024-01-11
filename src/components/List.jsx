/* eslint-disable react/prop-types */
import { useContext, useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ListsDataContext from "../context/listsDataContextProvider";

const List = ({ list }) => {
  const taskInputRef = useRef(null);
  // const listRef = useRef(null);

  console.log("LIST ITEM", list);
  const { lists, updateLists } = useContext(ListsDataContext);

  const handleCreateTaskClick = async (listId) => {
    const taskName = taskInputRef.current.value;
    if (!taskName) return;

    taskInputRef.current.value = "";
    try {
      const response = await fetch("http://localhost:7000/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName, listId }),
      });
      const data = await response.json();
      const newTask = {
        taskName: data.task.taskName,
        taskId: data.task.taskId,
        isCompleted: false,
      };
      console.log("newTask", newTask);

      const listIndex = lists.findIndex((list) => list.listId === listId);
      const newTasks = [...lists[listIndex].tasks, newTask];

      const updatedList = {
        ...lists[listIndex],
        tasks: newTasks,
      };
      const newLists = [...lists];

      newLists[listIndex] = updatedList;

      updateLists(newLists);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (listRef.current) {
  //     const listContainer = listRef.current;
  //     listContainer.scrollTop = listContainer.scrollHeight;
  //   }
  // }, [list]);

  return (
    <div className="w-80 border flex flex-col">
      <h3 className="h-[10%] px-4 py-2 text-center font-semibold border-b bg-[#222]">
        {list?.listName}
      </h3>
      <div className="h-[90%] px-4 pt-4 flex-grow bg-[#272829]">
        <Droppable droppableId={list?.listId} type="TASK">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // ref={listRef}
              className="pb-4 h-[85%] flex flex-col gap-2  overflow-y-auto"
            >
              {list?.tasks?.map((task, index) => {
                return (
                  <Draggable
                    draggableId={task.taskId}
                    key={task.taskId}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 10px rgba(0,0,0,0.5)"
                            : "none",
                        }}
                        className="px-4 py-2 flex gap-4 bg-[#333]"
                      >
                        <input type="checkbox" className="min-w-8 h-8 border" />
                        <input
                          type="text"
                          disabled
                          className="w-full outline-none bg-[#333]"
                          value={task.taskName}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="h-[15%] flex items-center">
          <div className="flex gap-2">
            <input
              type="text"
              ref={taskInputRef}
              placeholder="Task name"
              className="p-2 flex-grow"
            />
            <button
              onClick={() => handleCreateTaskClick(list.listId)}
              className="w-10 h-10 text-2xl font-semibold  rounded-full cursor-pointer hover:opacity-50 active:scale-90 transition-all bg-gray-500"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
