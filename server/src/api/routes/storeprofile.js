import { Router } from "express";

import StoreProfileService from "../../services/storeprofile.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/storeprofile.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: StoreProfile
 *   description: API for managing StoreProfile objects
 *
 * /store-profile:
 *   get:
 *     tags: [StoreProfile]
 *     summary: Get all the StoreProfile objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of StoreProfile objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/StoreProfile'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await StoreProfileService.list();
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
 * /store-profile:
 *   post:
 *     tags: [StoreProfile]
 *     summary: Create a new StoreProfile
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StoreProfile'
 *     responses:
 *       201:
 *         description: The created StoreProfile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreProfile'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await StoreProfileService.create(req.validatedBody);
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
 * /store-profile/{id}:
 *   get:
 *     tags: [StoreProfile]
 *     summary: Get a StoreProfile by id
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
 *         description: StoreProfile object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreProfile'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await StoreProfileService.get(req.params.id);
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
 * /store-profile/{id}:
 *   put:
 *     tags: [StoreProfile]
 *     summary: Update StoreProfile with the specified id
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
 *             $ref: '#/components/schemas/StoreProfile'
 *     responses:
 *       200:
 *         description: The updated StoreProfile object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StoreProfile'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await StoreProfileService.update(
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
 * /store-profile/{id}:
 *   delete:
 *     tags: [StoreProfile]
 *     summary: Delete StoreProfile with the specified id
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
    const success = await StoreProfileService.delete(req.params.id);
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
