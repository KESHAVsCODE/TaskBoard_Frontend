const handleCreateTaskClick = async (
  listId,
  listIndex,
  lists,
  updateLists,
  taskInputRef,
  handleTaskCompletion
) => {
  const taskName = taskInputRef.current.value;
  if (!taskName) return;

  taskInputRef.current.value = "";
  try {
    const response = await fetch(
      "https://taskboard-backend-j1wk.onrender.com/task/create",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ taskName, listId }),
      }
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data?.message);
    const newTask = {
      taskName: data.data.taskName,
      taskId: data.data.taskId,
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
    handleTaskCompletion("Task created successfully");
  } catch (error) {
    console.log(error);
    // handleTaskCompletion();
  }
};
export default handleCreateTaskClick;
