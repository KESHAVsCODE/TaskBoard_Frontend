const handleCreateListClick = async ({
  lists,
  updateLists,
  inputRef,
  handleTaskCompletion,
}) => {
  const listName = inputRef.current.value;
  if (!listName) return;
  console.log(listName);
  inputRef.current.value = "";
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/list/create`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listName }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message);
    const newList = {
      listName: data.data.listName,
      listId: data.data.listId,
      tasks: [],
    };
    updateLists([...lists, newList]);
    handleTaskCompletion("List crated successfully");
  } catch (error) {
    console.log(error);
  }
};
export default handleCreateListClick;
