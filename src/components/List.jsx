/* eslint-disable react/prop-types */

import { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import handleCreateTaskClick from "../handlers/handleCreateTaskClick";
import handleDeleteTaskClick from "../handlers/handleDeleteTaskClick";
const List = ({
  list,
  listIndex,
  lists,
  updateLists,
  handleTaskCompletion,
}) => {
  const taskInputRef = useRef(null);
  // const listRef = useRef(null);
  console.log("LIST ITEM", list);

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
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 10px rgba(0,0,0,0.5)"
                            : "none",
                        }}
                        className="pl-4 pr-2 py-2 flex items-center gap-2 bg-[#333]"
                      >
                        <input
                          onChange={() =>
                            handleDeleteTaskClick(
                              list.listId,
                              listIndex,
                              task.taskId,
                              index,
                              lists,
                              updateLists,
                              handleTaskCompletion
                            )
                          }
                          type="checkbox"
                          className="min-w-8 h-8 border"
                        />
                        <input
                          type="text"
                          disabled
                          className="w-full outline-none bg-[#333]"
                          value={task.taskName}
                        />
                        <img
                          src="../../public/assets/drag-lightgray.png"
                          alt="drag-icon"
                          className="h-6"
                          {...provided.dragHandleProps}
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
              onClick={() =>
                handleCreateTaskClick(
                  list.listId,
                  listIndex,
                  lists,
                  updateLists,
                  taskInputRef,
                  handleTaskCompletion
                )
              }
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
