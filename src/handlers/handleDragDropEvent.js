const handleDragDropEvent = (
  results,
  lists,
  setLists,
  handleTaskCompletion
) => {
  const { source, destination, type, draggableId } = results;
  console.log(results);
  if (!destination) return;

  if (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  ) {
    return;
  }

  if (type === "TASK") {
    const sourceListIndex = lists.findIndex(
      (list) => list.listId === source.droppableId
    );

    const destinationListIndex =
      source.droppableId === destination.droppableId
        ? sourceListIndex
        : lists.findIndex((list) => list.listId === destination.droppableId);

    const newSourceListItems = [...lists[sourceListIndex].tasks];
    const newDestinationListItems =
      sourceListIndex != destinationListIndex
        ? [...lists[destinationListIndex].tasks]
        : newSourceListItems;

    const [removedItem] = newSourceListItems.splice(source.index, 1);
    newDestinationListItems.splice(destination.index, 0, removedItem);

    const newDataList = [...lists];

    newDataList[sourceListIndex] = {
      ...lists[sourceListIndex],
      tasks: newSourceListItems,
    };
    newDataList[destinationListIndex] = {
      ...lists[destinationListIndex],
      tasks: newDestinationListItems,
    };

    setLists(newDataList);
    updateTasksInDatabase({
      taskId: draggableId,
      sourceListId: source.droppableId,
      destinationListId: destination.droppableId,
      handleTaskCompletion,
    });

    // const reorderedTaskList = [...list]; //This is not a good approach because we are directly modifying the shallow copy that are currently in use
    // const [removedTask] = reorderedTaskList[sourceListIndex].listItems.splice(
    //   // and we are mutating the state without the setter function this is not recommended in react
    //   source.index,
    //   1
    // );
    // reorderedTaskList[destinationListIndex].listItems.splice(
    //   destination.index,
    //   0,
    //   removedTask
    // );
    // return setList(reorderedTaskList);
  }
};

const updateTasksInDatabase = async ({
  taskId,
  sourceListId,
  destinationListId,
  handleTaskCompletion,
}) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/task/move`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, sourceListId, destinationListId }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message);
    handleTaskCompletion("Task moved successfully");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export default handleDragDropEvent;
