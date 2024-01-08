const CreateNewList = () => {
  return (
    <div className="border">
      <h3 className="font-semibold border-b py-2">Create New List</h3>
      <div className="p-4 flex gap-2">
        <input type="text" placeholder="List name" className="p-2 flex-grow" />
        <button className="w-10 h-10 text-2xl font-semibold bg-gray-500 rounded-full cursor-pointer hover:opacity-50 active:scale-90 transition-all">
          +
        </button>
      </div>
    </div>
  );
};

export default CreateNewList;
