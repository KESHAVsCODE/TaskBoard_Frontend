const handleDeleteTaskClick = async (
  listId,
  listIndex,
  taskId,
  taskIndex,
  lists,
  updateLists,
  handleTaskCompletion
) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/task/delete`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskId, listId }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message);
    const updatedTasks = [...lists[listIndex].tasks];
    updatedTasks.splice(taskIndex, 1);

    const updatedLists = [...lists];

    updatedLists[listIndex] = {
      ...lists[listIndex],
      tasks: updatedTasks,
    };
    updateLists(updatedLists);
    handleTaskCompletion("Task completed successfully");
  } catch (error) {
    console.log("Error", error.message);
  }
};
export default handleDeleteTaskClick;
