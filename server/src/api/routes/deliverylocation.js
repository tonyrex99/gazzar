import { Router } from "express";

import DeliveryLocationService from "../../services/deliverylocation.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/deliverylocation.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: DeliveryLocation
 *   description: API for managing DeliveryLocation objects
 *
 * /delivery-location:
 *   get:
 *     tags: [DeliveryLocation]
 *     summary: Get all the DeliveryLocation objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of DeliveryLocation objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DeliveryLocation'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await DeliveryLocationService.list();
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
 * /delivery-location:
 *   post:
 *     tags: [DeliveryLocation]
 *     summary: Create a new DeliveryLocation
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryLocation'
 *     responses:
 *       201:
 *         description: The created DeliveryLocation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryLocation'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await DeliveryLocationService.create(req.validatedBody);
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
 * /delivery-location/{id}:
 *   get:
 *     tags: [DeliveryLocation]
 *     summary: Get a DeliveryLocation by id
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
 *         description: DeliveryLocation object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryLocation'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await DeliveryLocationService.get(req.params.id);
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
 * /delivery-location/{id}:
 *   put:
 *     tags: [DeliveryLocation]
 *     summary: Update DeliveryLocation with the specified id
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
 *             $ref: '#/components/schemas/DeliveryLocation'
 *     responses:
 *       200:
 *         description: The updated DeliveryLocation object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeliveryLocation'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await DeliveryLocationService.update(
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
 * /delivery-location/{id}:
 *   delete:
 *     tags: [DeliveryLocation]
 *     summary: Delete DeliveryLocation with the specified id
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
    const success = await DeliveryLocationService.delete(req.params.id);
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
