const handleCreateTaskClick = async (
  listId,
  listIndex,
  lists,
  updateLists,
  taskInputRef
) => {
  const taskName = taskInputRef.current.value;
  if (!taskName) return;

  taskInputRef.current.value = "";
  try {
    const response = await fetch("http://localhost:7000/task/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskName, listId }),
    });
    const data = await response.json();
    const newTask = {
      taskName: data.task.taskName,
      taskId: data.task.taskId,
      isCompleted: false,
    };
    console.log("newTask", newTask);

    const updatedTasks = [...lists[listIndex].tasks, newTask];

    const updatedLists = [...lists];

    updatedLists[listIndex] = {
      ...lists[listIndex],
      tasks: updatedTasks,
    };

    updateLists(updatedLists);
  } catch (error) {
    console.log(error);
  }
};
export default handleCreateTaskClick;
