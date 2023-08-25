import { Router } from "express";

import CartDetailsService from "../../services/cartdetails.js";
import { requireUser } from "../middlewares/auth.js";
import { requireSchema, requireValidId } from "../middlewares/validate.js";
import schema from "../schemas/cartdetails.js";

const router = Router();

router.use(requireUser);

/** @swagger
 *
 * tags:
 *   name: CartDetails
 *   description: API for managing CartDetails objects
 *
 * /cart-details:
 *   get:
 *     tags: [CartDetails]
 *     summary: Get all the CartDetails objects
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of CartDetails objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartDetails'
 */
router.get("", async (req, res, next) => {
  try {
    const results = await CartDetailsService.list();
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
 * /cart-details:
 *   post:
 *     tags: [CartDetails]
 *     summary: Create a new CartDetails
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartDetails'
 *     responses:
 *       201:
 *         description: The created CartDetails object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartDetails'
 */
router.post("", requireSchema(schema), async (req, res, next) => {
  try {
    const obj = await CartDetailsService.create(req.validatedBody);
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
 * /cart-details/{id}:
 *   get:
 *     tags: [CartDetails]
 *     summary: Get a CartDetails by id
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
 *         description: CartDetails object with the specified id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartDetails'
 */
router.get("/:id", requireValidId, async (req, res, next) => {
  try {
    const obj = await CartDetailsService.get(req.params.id);
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
 * /cart-details/{id}:
 *   put:
 *     tags: [CartDetails]
 *     summary: Update CartDetails with the specified id
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
 *             $ref: '#/components/schemas/CartDetails'
 *     responses:
 *       200:
 *         description: The updated CartDetails object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CartDetails'
 */
router.put(
  "/:id",
  requireValidId,
  requireSchema(schema),
  async (req, res, next) => {
    try {
      const obj = await CartDetailsService.update(
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
 * /cart-details/{id}:
 *   delete:
 *     tags: [CartDetails]
 *     summary: Delete CartDetails with the specified id
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
    const success = await CartDetailsService.delete(req.params.id);
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
