import { Router } from "express";

import StoreTemplateService from "../../services/storetemplate.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/storetemplate.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: StoreTemplate
 *   description: API for managing StoreTemplate objects
 *
 * /store-template:
 *   get:
 *     tags: [StoreTemplate]
 *     summary: Get all the StoreTemplate objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of StoreTemplate objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoreTemplate'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await StoreTemplateService.list();
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
 * /store-template:
 *   post:
 *     tags: [StoreTemplate]
 *     summary: Create a new StoreTemplate
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreTemplate'
 *     responses:
 *       201:
 *         description: The created StoreTemplate object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreTemplate'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await StoreTemplateService.create(req.validatedBody);
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
 * /store-template/{id}:
 *   get:
 *     tags: [StoreTemplate]
 *     summary: Get a StoreTemplate by id
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
 *         description: StoreTemplate object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreTemplate'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await StoreTemplateService.get(req.params.id);
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
 * /store-template/{id}:
 *   put:
 *     tags: [StoreTemplate]
 *     summary: Update StoreTemplate with the specified id
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
 *             $ref: '#/components/schemas/StoreTemplate'
 *     responses:
 *       200:
 *         description: The updated StoreTemplate object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreTemplate'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await StoreTemplateService.update(
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
 * /store-template/{id}:
 *   delete:
 *     tags: [StoreTemplate]
 *     summary: Delete StoreTemplate with the specified id
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
    const success = await StoreTemplateService.delete(req.params.id);
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
