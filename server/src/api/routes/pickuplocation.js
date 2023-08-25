import { Router } from "express";

import PickupLocationService from "../../services/pickuplocation.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/pickuplocation.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: PickupLocation
 *   description: API for managing PickupLocation objects
 *
 * /pickup-location:
 *   get:
 *     tags: [PickupLocation]
 *     summary: Get all the PickupLocation objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of PickupLocation objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PickupLocation'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await PickupLocationService.list();
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
 * /pickup-location:
 *   post:
 *     tags: [PickupLocation]
 *     summary: Create a new PickupLocation
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PickupLocation'
 *     responses:
 *       201:
 *         description: The created PickupLocation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PickupLocation'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await PickupLocationService.create(req.validatedBody);
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
 * /pickup-location/{id}:
 *   get:
 *     tags: [PickupLocation]
 *     summary: Get a PickupLocation by id
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
 *         description: PickupLocation object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PickupLocation'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await PickupLocationService.get(req.params.id);
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
 * /pickup-location/{id}:
 *   put:
 *     tags: [PickupLocation]
 *     summary: Update PickupLocation with the specified id
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
 *             $ref: '#/components/schemas/PickupLocation'
 *     responses:
 *       200:
 *         description: The updated PickupLocation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PickupLocation'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await PickupLocationService.update(
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
 * /pickup-location/{id}:
 *   delete:
 *     tags: [PickupLocation]
 *     summary: Delete PickupLocation with the specified id
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
    const success = await PickupLocationService.delete(req.params.id);
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
