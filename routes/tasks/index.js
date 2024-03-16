import { Router } from "express";
import { taskList } from "../../constants.js";
import { generateRandom4Digits } from "../../utils.js";
import { taskValidation } from "../../validation/taskValidation.js";
import { validateQueryParams } from "../../validation/queryParamsValidation.js";

const router = Router();

router.get("/api/", (request, response) => {
  response.status(200).send({
    msg: "This api handles data for a task manager app",
  });
});

router.get("/api/tasks", validateQueryParams, (request, response) => {
  const {
    query: { filter, value, order, orderBy },
  } = request;

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

export default router;
