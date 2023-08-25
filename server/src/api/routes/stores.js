import { Router } from "express";

import StoresService from "../../services/stores.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/stores.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: Stores
 *   description: API for managing Stores objects
 *
 * /stores:
 *   get:
 *     tags: [Stores]
 *     summary: Get all the Stores objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of Stores objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stores'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await StoresService.list();
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
 * /stores:
 *   post:
 *     tags: [Stores]
 *     summary: Create a new Stores
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Stores'
 *     responses:
 *       201:
 *         description: The created Stores object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stores'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await StoresService.create(req.validatedBody);
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
 * /stores/{id}:
 *   get:
 *     tags: [Stores]
 *     summary: Get a Stores by id
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
 *         description: Stores object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stores'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await StoresService.get(req.params.id);
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
 * /stores/{id}:
 *   put:
 *     tags: [Stores]
 *     summary: Update Stores with the specified id
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
 *             $ref: '#/components/schemas/Stores'
 *     responses:
 *       200:
 *         description: The updated Stores object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stores'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await StoresService.update(req.params.id, req.validatedBody);
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
 * /stores/{id}:
 *   delete:
 *     tags: [Stores]
 *     summary: Delete Stores with the specified id
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
    const success = await StoresService.delete(req.params.id);
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
