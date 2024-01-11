const handleDragDropEvent = (results, list, setList) => {
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
    const sourceListIndex = list.findIndex(
      (list) => list.id === source.droppableId
    );

    const destinationListIndex =
      source.droppableId === destination.droppableId
        ? sourceListIndex
        : list.findIndex((list) => list.id === destination.droppableId);

    const newSourceListItems = [...list[sourceListIndex].listItems];
    const newDestinationListItems =
      sourceListIndex != destinationListIndex
        ? [...list[destinationListIndex].listItems]
        : newSourceListItems;

    const [removedItem] = newSourceListItems.splice(source.index, 1);
    newDestinationListItems.splice(destination.index, 0, removedItem);

    const newDataList = [...list];

    newDataList[sourceListIndex] = {
      ...list[sourceListIndex],
      listItems: newSourceListItems,
    };
    newDataList[destinationListIndex] = {
      ...list[destinationListIndex],
      listItems: newDestinationListItems,
    };

    return setList(newDataList);

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
