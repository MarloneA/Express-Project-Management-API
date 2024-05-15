import { taskList } from "../../utils/constants.js";
import { generateRandom4Digits } from "../../utils/generateRandom.js";

export const searchTasks = (searchQuery) => {
  const tasks = taskList.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    tasks,
    count: tasks.length,
  };
};

export const filterTasks = (filterParams) => {
  const { filter, value, order, orderBy } = filterParams;

  if (orderBy && order === "ASC") {
    taskList.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
  } else if (order === "DSC") {
    taskList.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
  }

  if (filter && value) {
    const filteredTasks = taskList.filter(
      (task) => task[filter].toLowerCase() === value.toLowerCase()
    );

    return { tasks: filteredTasks, count: filteredTasks.length };
  } else {
    // If no filtering is performed, return all tasks
    return { tasks: taskList, count: taskList.length };
  }
};

export const getTaskById = (id) => {
  return { task: taskList.filter((task) => task.id === id) };
};

export const createNewTask = ({ title, status, priority }) => {
  const newTask = {
    id: crypto.randomUUID(),
    taskid: `TASK-${generateRandom4Digits()}`,
    title,
    status,
    priority,
  };

  const count = taskList.push(newTask);

  return {
    count,
  };
};

export const editTask = (id, updatedTask) => {
  const findTaskIndex = taskList.findIndex((task) => task.id === id);

  // If the task with the given id is found, update it
  if (findTaskIndex !== -1) {
    taskList.splice(findTaskIndex, 1, {
      ...taskList[findTaskIndex],
      ...updatedTask,
    });
    return { taskList, status: "edited" };
  } else {
    // If task with given id is not found, return an error
    throw new Error("Task not found");
  }
};

export const deleteTask = (id) => {
  const selectedIndex = taskList.findIndex((task) => task.id === id);

  if (selectedIndex !== -1) {
    taskList.splice(selectedIndex, 1);
    return { message: `Task with id ${id} was deleted` };
  } else {
    throw new Error(`Task with id ${id} cannot be found`);
  }
};
