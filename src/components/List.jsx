const List = () => {
  return (
    <div className="w-80 border flex flex-col">
      <h3 className="h-[10%] px-4 py-2 text-center font-semibold border-b bg-[#222]">
        List1
      </h3>
      <div className="h-[90%] px-4 pt-4 flex-grow bg-[#272829]">
        <div className="pb-4 h-[85%] flex flex-col gap-2 overflow-y-auto">
          <div className="px-2 py-2 flex items-center gap-2 bg-[#333]">
            <input type="checkbox" className="w-6 h-6" />
            <input
              type="text"
              disabled
              className="outline-none bg-[#333] "
              value="complete work in time for ... complete work in time for ..."
            />
          </div>
        </div>
        <div className="h-[15%] flex items-center">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="List name"
              className="p-2 flex-grow"
            />
            <button className="w-10 h-10 text-2xl font-semibold  rounded-full cursor-pointer hover:opacity-50 active:scale-90 transition-all bg-gray-500">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
