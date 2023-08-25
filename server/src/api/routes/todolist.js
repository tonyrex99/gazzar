import { Router } from "express";

import TodoListService from "../../services/todolist.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/todolist.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: TodoList
 *   description: API for managing TodoList objects
 *
 * /todo-list:
 *   get:
 *     tags: [TodoList]
 *     summary: Get all the TodoList objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of TodoList objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoList'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await TodoListService.list();
    res.json(results);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /todo-list:
 *   post:
 *     tags: [TodoList]
 *     summary: Create a new TodoList
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoList'
 *     responses:
 *       201:
 *         description: The created TodoList object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await TodoListService.create(req.validatedBody);
    res.status(201).json(obj);
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /todo-list/{id}:
 *   get:
 *     tags: [TodoList]
 *     summary: Get a TodoList by id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: TodoList object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await TodoListService.get(req.params.id);
    if (obj) {
      res.json(obj);
    } else {
      res.status(404).json({ error: "Resource not found" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

/** @swagger
 *
 * /todo-list/{id}:
 *   put:
 *     tags: [TodoList]
 *     summary: Update TodoList with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TodoList'
 *     responses:
 *       200:
 *         description: The updated TodoList object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TodoList'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await TodoListService.update(
        req.params.id,
        req.validatedBody
      );
      if (obj) {
        res.status(200).json(obj);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (error) {
      if (error.isClientError()) {
        res.status(400).json({ error });
      } else {
        next(error);
      }
    }
  }
);

/** @swagger
 *
 * /todo-list/{id}:
 *   delete:
 *     tags: [TodoList]
 *     summary: Delete TodoList with the specified id
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *        description: OK, object deleted
 */
router.delete("/:id", requireValidId, async (req, res, next) => {
  try {
    const success = await TodoListService.delete(req.params.id);
    if (success) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Not found, nothing deleted" });
    }
  } catch (error) {
    if (error.isClientError()) {
      res.status(400).json({ error });
    } else {
      next(error);
    }
  }
});

export default router;
