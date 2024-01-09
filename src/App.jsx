import CreateNewList from "./components/CreateNewList";
import List from "./components/List";
import { DragDropContext } from "react-beautiful-dnd";
import { useState } from "react";

const data = [
  {
    id: "office-work",
    listName: "Office Work",
    listItems: [
      {
        id: "1",
        isCompleted: false,
        taskName: "Attend meeting today at 4pm",
      },
      {
        id: "2",
        isCompleted: false,
        taskName: "Complete assignment by tomorrow",
      },
      {
        id: "3",
        isCompleted: false,
        taskName: "attend node js lecture today at 10pm ",
      },
      {
        id: "4",
        isCompleted: false,
        taskName: "DSA practice for 2hr   ",
      },
    ],
  },
  {
    id: "home-work",
    listName: "Home work",
    listItems: [
      {
        id: "5",
        isCompleted: false,
        taskName: "Go to market for shopping",
      },
      {
        id: "6",
        isCompleted: false,
        taskName: "Play football tournament",
      },
      {
        id: "7",
        isCompleted: false,
        taskName: "Go to Gym today at 6pm",
      },
      {
        id: "8",
        isCompleted: false,
        taskName: "watching movie science related",
      },
    ],
  },
];

function App() {
  const [list, setList] = useState(data);

  const handleDragDropEvent = (results) => {
    const { source, destination, type } = results;
    console.log(results);
    if (!destination) return;

    if (
      source.draggableId === destination.draggableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "TASK") {
      const sourceListIndex = data.findIndex(
        (list) => list.id === source.droppableId
      );

      const destinationListIndex =
        source.droppableId === destination.droppableId
          ? sourceListIndex
          : data.findIndex((list) => list.id === destination.droppableId);

      console.log("sourceListIndex", sourceListIndex);
      console.log("destinationListIndex", destinationListIndex);

      const newSourceListItems = [...data[sourceListIndex].listItems];
      const newDestinationListItems =
        sourceListIndex != destinationListIndex
          ? [...data[destinationListIndex].listItems]
          : newSourceListItems;

      const [removedItem] = newSourceListItems.splice(source.index, 0);
      newDestinationListItems.splice(destination.index, 0, removedItem);

      const newDataList = [...data];

      newDataList[sourceListIndex] = {
        ...data[sourceListIndex],
        listItems: newSourceListItems,
      };
      newDataList[destinationListIndex] = {
        ...data[destinationListIndex],
        listItems: newDestinationListItems,
      };

      return setList(newDataList);

      // const reorderedTaskList = [...data]; //This is not a good approach because we are directly modifying the shallow copy that are currently in use
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
  return (
    <>
      <div className="w-full h-full">
        <header className="p-4 flex justify-between bg-gray-700">
          <p className="text-2xl font-medium">Welcome Keshav Chamria</p>
          <button className="px-4 py-1 bg-blue-500 font-semibold rounded-lg hover:opacity-50 active:scale-90 transition-all">
            Logout
          </button>
        </header>
        <div className="h-[480px] m-4 p-4 flex gap-4 bg-extraLightBlack overflow-x-auto">
          <DragDropContext onDragEnd={handleDragDropEvent}>
            <List list={list[0]} setList={setList} />
            <List list={list[1]} setList={setList} />
          </DragDropContext>
          <CreateNewList />
        </div>
      </div>
      <input type="text" />
    </>
  );
}

export default App;
