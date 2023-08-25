import { Router } from "express";

import StoreDataService from "../../services/storedata.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/storedata.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: StoreData
 *   description: API for managing StoreData objects
 *
 * /store-data:
 *   get:
 *     tags: [StoreData]
 *     summary: Get all the StoreData objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of StoreData objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoreData'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await StoreDataService.list();
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
 * /store-data:
 *   post:
 *     tags: [StoreData]
 *     summary: Create a new StoreData
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreData'
 *     responses:
 *       201:
 *         description: The created StoreData object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreData'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await StoreDataService.create(req.validatedBody);
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
 * /store-data/{id}:
 *   get:
 *     tags: [StoreData]
 *     summary: Get a StoreData by id
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
 *         description: StoreData object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreData'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await StoreDataService.get(req.params.id);
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
 * /store-data/{id}:
 *   put:
 *     tags: [StoreData]
 *     summary: Update StoreData with the specified id
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
 *             $ref: '#/components/schemas/StoreData'
 *     responses:
 *       200:
 *         description: The updated StoreData object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreData'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await StoreDataService.update(
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
 * /store-data/{id}:
 *   delete:
 *     tags: [StoreData]
 *     summary: Delete StoreData with the specified id
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
    const success = await StoreDataService.delete(req.params.id);
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
