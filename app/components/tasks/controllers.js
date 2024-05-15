import {
  createNewTask,
  deleteTask,
  editTask,
  filterTasks,
  getTaskById,
  searchTasks,
} from "./services.js";
import { taskList } from "../../../utils/constants.js";

export const searchTasksByQuery = (request, response) => {
  const {
    query: { q },
  } = request;

  if (q) {
    const { tasks, count } = searchTasks(q);

    response.status(200).send({
      tasks,
      count,
    });
  }

  response.status(200).send({
    data: {
      tasks: taskList,
      count: taskList.length,
    },
  });
};

export const getAllTasks = (request, response) => {
  const {
    query: { filter, value, order, orderBy },
  } = request;

  const { tasks, count } = filterTasks({ filter, value, order, orderBy });

  if (tasks) {
    return response.status(200).send({
      data: tasks,
      count,
    });
  }

  response.status(200).send({
    data: {
      tasks,
      count,
    },
  });
};

export const getTasksById = (request, response) => {
  const {
    params: { id },
  } = request;

  const task = getTaskById(id);

  response.status(200).send({
    data: {
      task,
    },
  });
};

export const createTask = (request, response) => {
  const {
    body: { title, status, priority },
  } = request;

  const { count } = createNewTask({ title, status, priority });

  response.status(201).send({
    data: {
      tasks: taskList,
      count,
    },
  });
};

export const editTaskById = (request, response) => {
  const {
    params: { id },
    body,
  } = request;

  try {
    const { taskList, status } = editTask(id, body);

    response.status(201).send({
      data: {
        task: taskList,
        status: status,
      },
    });
  } catch (error) {
    response.status(404).send({
      error: {
        message: error.message,
      },
    });
  }
};

export const deleteTaskById = (request, response) => {
  const {
    params: { id },
  } = request;

  try {
    const { message } = deleteTask(id);

    response.status(200).send({
      data: {
        message: message,
      },
    });
  } catch (error) {
    response.status(404).send({
      error: {
        message: error.message,
      },
    });
  }
};

export const addTaskToFavourites = (request, response) => {
  const { body: item } = request;

  const { favourite } = request.session;

  if (favourite) {
    favourite.push(item);
  } else {
    request.session.favourite = [item];
  }
  return response.status(201).send(item);
};

export const getFavourites = (request, response) => {
  return request.session.favourite
    ? response.status(200).send({
        data: {
          favourite: request.session.favourite,
        },
      })
    : response.status(200).send({
        data: {
          favourite: [],
        },
      });
};
