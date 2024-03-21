import { Router, response } from "express";
import { taskList } from "../../utils/constants.js";
import { generateRandom4Digits } from "../../utils/generateRandom.js";
import { taskValidation } from "../../validation/taskValidation.js";
import { validateQueryParams } from "../../validation/queryParamsValidation.js";

const router = Router();

router.use((request, response, next) => {
  if (!request.user) {
    return response.status(401).send({
      message: "unauthorized",
    });
  }
  next();
});

router.get("/api/", (request, response) => {
  response.status(200).send({
    msg: "This api handles data for a task manager app",
  });
});

router.get("/api/tasks/search", validateQueryParams, (request, response) => {
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
});

router.get("/api/tasks", validateQueryParams, (request, response) => {
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
});

router.get("/api/tasks/:id", (request, response) => {
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
});

router.post("/api/tasks", taskValidation, (request, response) => {
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
});

router.put("/api/task/:id", taskValidation, (request, response) => {
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
});

router.delete("/api/task/:id", (request, response) => {
  const {
    params: { id },
  } = request;

  const selectedIndex = taskList.findIndex((task) => task.id === id);

  if (selectedIndex > -1) {
    const deletedTask = taskList.splice(selectedIndex, 1);

    response.status(200).send({
      data: {
        message: `task with id ${deletedTask[0].id} was deleted`,
      },
    });
  }

  response.status(404).send({
    data: {
      message: `task with id ${id} cannot be found`,
    },
  });
});

router.post("/api/task/favourite", (request, response) => {
  if (!request.session.user)
    return response.status(401).send({ message: "unauthorized" });

  const { body: item } = request;

  const { favourite } = request.session;

  if (favourite) {
    favourite.push(item);
  } else {
    request.session.favourite = [item];
  }
  return response.status(201).send(item);
});

router.get("/api/task/favourite", (request, response) => {
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
});

export default router;
