const handleDragDropEvent = (results, lists, setLists) => {
  const { source, destination, type } = results;
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

    return setLists(newDataList);

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

export default handleDragDropEvent;
