import CreateNewList from "./components/CreateNewList";
import List from "./components/List";
function App() {
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
          <List />
          <CreateNewList />
        </div>
      </div>
    </>
  );
}

export default App;
