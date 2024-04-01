export const searchTasks = (searchQuery) => {
  return taskList.filter((task) =>
    task.title.toLowerCase().includes(q.toLowerCase())
  );
};

export const filterTasks = (filterParams) => {
  const { filter, value, order, orderBy } = filterParams;

  if (orderBy && order === "ASC") {
    tasks.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
  } else if (order === "DSC") {
    tasks.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
  }

  if (filter && value) {
    const filteredTasks = tasks.filter((task) => task[filter] === value);

    return filteredTasks;
  }
};
