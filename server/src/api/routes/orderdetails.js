import { Router } from "express";

import OrderDetailsService from "../../services/orderdetails.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/orderdetails.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: OrderDetails
 *   description: API for managing OrderDetails objects
 *
 * /order-details:
 *   get:
 *     tags: [OrderDetails]
 *     summary: Get all the OrderDetails objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of OrderDetails objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrderDetails'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await OrderDetailsService.list();
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
 * /order-details:
 *   post:
 *     tags: [OrderDetails]
 *     summary: Create a new OrderDetails
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetails'
 *     responses:
 *       201:
 *         description: The created OrderDetails object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetails'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await OrderDetailsService.create(req.validatedBody);
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
 * /order-details/{id}:
 *   get:
 *     tags: [OrderDetails]
 *     summary: Get a OrderDetails by id
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
 *         description: OrderDetails object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetails'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await OrderDetailsService.get(req.params.id);
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
 * /order-details/{id}:
 *   put:
 *     tags: [OrderDetails]
 *     summary: Update OrderDetails with the specified id
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
 *             $ref: '#/components/schemas/OrderDetails'
 *     responses:
 *       200:
 *         description: The updated OrderDetails object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetails'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await OrderDetailsService.update(
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
 * /order-details/{id}:
 *   delete:
 *     tags: [OrderDetails]
 *     summary: Delete OrderDetails with the specified id
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
    const success = await OrderDetailsService.delete(req.params.id);
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
