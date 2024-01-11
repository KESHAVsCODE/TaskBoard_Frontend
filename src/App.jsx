import CreateNewList from "./components/CreateNewList";
import List from "./components/List";
import { DragDropContext } from "react-beautiful-dnd";
// import data from "./constants/dummyData";
import handleDragDropEvent from "./utils/handleDragDropEvent";
import useFetchListData from "./hooks/useFetchListData";
import { useEffect, useState } from "react";

function App() {
  const [lists, setLists] = useState([]);

  const { listsData, error, loading } = useFetchListData();

  useEffect(() => {
    if (listsData.length !== 0) {
      setLists(listsData);
    }
  }, [listsData, error, loading]);
  if (loading) return <p className="text-center">Loading</p>;

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
          <DragDropContext
            onDragEnd={(results) =>
              handleDragDropEvent(results, lists, setLists)
            }
          >
            <List list={lists[0]} />
            <List list={lists[1]} />
          </DragDropContext>
          <CreateNewList />
        </div>
      </div>
      <input type="text" />
    </>
  );
}

export default App;
