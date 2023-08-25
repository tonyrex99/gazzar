import { Router } from "express";

import NotificationsService from "../../services/notifications.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/notifications.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: Notifications
 *   description: API for managing Notifications objects
 *
 * /notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Get all the Notifications objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of Notifications objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Notifications'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await NotificationsService.list();
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
 * /notifications:
 *   post:
 *     tags: [Notifications]
 *     summary: Create a new Notifications
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notifications'
 *     responses:
 *       201:
 *         description: The created Notifications object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notifications'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await NotificationsService.create(req.validatedBody);
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
 * /notifications/{id}:
 *   get:
 *     tags: [Notifications]
 *     summary: Get a Notifications by id
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
 *         description: Notifications object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notifications'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await NotificationsService.get(req.params.id);
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
 * /notifications/{id}:
 *   put:
 *     tags: [Notifications]
 *     summary: Update Notifications with the specified id
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
 *             $ref: '#/components/schemas/Notifications'
 *     responses:
 *       200:
 *         description: The updated Notifications object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Notifications'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await NotificationsService.update(
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
 * /notifications/{id}:
 *   delete:
 *     tags: [Notifications]
 *     summary: Delete Notifications with the specified id
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
    const success = await NotificationsService.delete(req.params.id);
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
