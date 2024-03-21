import { taskList } from "../utils/constants.js";
import { generateRandom4Digits } from "../utils/generateRandom.js";

export const searchTasksByQuery = (request, response) => {
  const {
    query: { q },
  } = request;

  if (request.user) {
    const tasks = [...taskList];

    if (q) {
      const searchResults = taskList.filter((task) =>
        task.title.toLowerCase().includes(q.toLowerCase())
      );
      response.status(200).send({
        tasks: searchResults,
        count: searchResults.length,
      });
    }

    response.status(200).send({
      data: {
        tasks,
        count: tasks.length,
      },
    });
  }

  response.status(403).send({
    message: "unauthorized user",
  });
};

export const getAllTasks = (request, response) => {
  const {
    query: { filter, value, order, orderBy },
  } = request;

  if (request.user) {
    const tasks = [...taskList];

    if (orderBy && order === "ASC") {
      tasks.sort((a, b) => a[orderBy].localeCompare(b[orderBy]));
    } else if (order === "DSC") {
      tasks.sort((a, b) => b[orderBy].localeCompare(a[orderBy]));
    }

    if (filter && value) {
      const filteredTasks = tasks.filter((task) => task[filter] === value);

      return response.status(200).send({
        data: filteredTasks,
        count: filteredTasks.length,
      });
    }

    response.status(200).send({
      data: {
        tasks,
        count: tasks.length,
      },
    });
  }

  response.status(403).send({
    message: "unauthorized user",
  });
};

export const getTasksById = (request, response) => {
  const {
    params: { id },
  } = request;

  const getTaskById = (id) => {
    return taskList.filter((task) => task.id === id);
  };

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

  const newTask = {
    id: crypto.randomUUID(),
    taskid: `TASK-${generateRandom4Digits()}`,
    title,
    status,
    priority,
  };

  const count = taskList.push(newTask);

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

  const findTaskIndex = taskList.findIndex((task) => task.id === id);

  taskList.splice(findTaskIndex, 1, {
    ...taskList[findTaskIndex],
    ...body,
  });

  response.status(201).send({
    data: {
      task: taskList,
      status: "edited",
    },
  });
};

export const deleteTaskById = (request, response) => {
  const {
    params: { id },
  } = request;

  const selectedIndex = taskList.findIndex((task) => task.id === id);

  if (selectedIndex > -1) {
    taskList.splice(selectedIndex, 1);

    response.status(200).send({
      data: {
        message: `task with id ${id} was deleted`,
      },
    });
  }

  response.status(404).send({
    data: {
      message: `task with id ${id} cannot be found`,
    },
  });
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
