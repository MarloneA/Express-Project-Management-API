import { taskList } from "../../../utils/constants.js";
import { generateRandom4Digits } from "../../../utils/generateRandom.js";
import { prisma } from "../../models/client.js";

export const searchTasks = async (searchQuery) => {
  try {
    const tasks = prisma.task.findMany({
      where: {
        title: {
          contains: searchQuery,
          mode: "insensitive",
        },
      },
    });

    return { tasks, error: null };
  } catch (error) {
    return { tasks: null, error };
  }
};

export const filterTasks = async ({ filterParams, id }) => {
  const { filter, value, order, orderBy } = filterParams;

  try {
    if (!filterParams) {
      const tasks = await prisma.task.findMany();

      return { tasks, error };
    }

    const tasks = await prisma.task.findMany({
      orderBy: {
        [orderBy]: order,
      },
      where: {
        [filter]: {
          contains: value,
          mode: "insensitive",
        },
      },
    });

    return { tasks, error: null };
  } catch (error) {
    return { tasks: null, error };
  }
};

export const getTaskById = (id) => {
  return { task: taskList.filter((task) => task.id === id) };
};

export const createNewTask = async ({ title, status, priority, userId }) => {
  const newTask = {
    id: crypto.randomUUID(),
    taskid: `TASK-${generateRandom4Digits()}`,
    title,
    status,
    priority,
    author: {
      connect: {
        id: userId,
      },
    },
  };

  try {
    const task = await prisma.task.create({
      data: {
        ...newTask,
      },
    });

    return {
      task,
      error: null,
    };
  } catch (error) {
    return {
      task: null,
      error,
    };
  }
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
