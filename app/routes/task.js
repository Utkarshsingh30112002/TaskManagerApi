const { Router } = require("express");
const {
  findAlltask,
  createTask,
  findOneTask,
  deleteOneTask,
  updateOneTask,
} = require("../controllers/taskControler");
const { z } = require("zod");

const taskRouter = Router();

const taskSchema = z.object({
  userId: z.number().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(["high", "low", "medium"]),
  dueDate: z.string(),
  status: z.enum(["pending", "completed"]).optional(),
});
let updateTaskSchema = taskSchema.partial().omit({
  userId: true,
});

let getUserSchema = z.object({
  priority: z.enum(["high", "low", "medium"]),
  status: z.enum(["pending", "completed"]),
  startDate: z.string(),
  endDate:z.string(),
  sortBy:z.string(),
  order:z.string()
}).partial();

taskRouter.get("/", async (req, res, next) => {
  try {
    const { priority, status, startDate, endDate, sortBy, order } = req.query;
    const queryParameter={ priority, status, startDate, endDate, sortBy, order }
    const result = getUserSchema.safeParse(queryParameter);
    if (!result.success) {
      const e = new Error(result.error.errors[0].message);
      e.statusCode = 400;
      throw e;
    }
    console.log(queryParameter)
    const tasks = await findAlltask(queryParameter,req.body.id);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

taskRouter.get("/:id", async (req, res, next) => {
  const taskId = req.params.id;
  const task = await findOneTask({ taskId, userId: req.body.id });
  res.json(task);
});

taskRouter.delete("/:id", async (req, res, next) => {
  const taskId = req.params.id;
  await deleteOneTask({ taskId, userId: req.body.id });
  res.json({ taskId, message: "deleted successfully" });
});

taskRouter.put("/:id", async (req, res, next) => {
  try {
    const { id, title, description, priority, dueDate, status } = req.body;
    const taskDetail = {
      title,
      description,
      priority,
      dueDate,
      status,
    };
    const result = updateTaskSchema.safeParse(taskDetail);
    if (!result.success) {
      const e = new Error(result.error.errors[0].message);
      e.statusCode = 400;
      throw e;
    }
    const taskId = req.params.id;
    await updateOneTask(taskDetail, { taskId, userId: id });
    res.json({ taskId, message: "Updated Successfully" });
  } catch (err) {
    next(err);
  }
});

taskRouter.post("/create", async (req, res, next) => {
  try {
    const {
      id: userId,
      title,
      description = "",
      priority,
      dueDate,
      status = "pending",
    } = req.body;
    const taskDetail = {
      userId,
      title,
      description,
      priority,
      dueDate,
      status,
    };
    const result = taskSchema.safeParse(taskDetail);
    if (!result.success) {
      const e = new Error(result.error.errors[0].message);
      e.statusCode = 400;
      throw e;
    }

    const task = await createTask(taskDetail);
    res.json(task);
  } catch (err) {
    next(err);
  }
});

module.exports = taskRouter;
