const handleDeleteTaskClick = async (
  listId,
  listIndex,
  taskId,
  taskIndex,
  lists,
  updateLists
) => {
  try {
    const response = await fetch("http://localhost:7000/task/delete", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskId, listId }),
    });
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

    console.log("data", data);
  } catch (error) {
    console.log("Error", error.message);
  }
};
export default handleDeleteTaskClick;
