import { Router } from "express";
import logger from "../logger.js";
import UserModel from "../db.js";
var router = Router();

class User {
  constructor(name) {
    this.name = name;
    this.id = Math.floor(Math.random() * 1000);
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
    this.role = "user";
    this.permissions = ["read", "write"];
    this.age = Math.floor(Math.random() * 50) + 18;
  }
}

class Response {
  constructor(user, success = true) {
    this.status = 200;
    this.user = user;
    this.success = success;
  }
}

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Create and return a random user
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     id:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                     role:
 *                       type: string
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                     age:
 *                       type: integer
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Server error
 */
router.post("/", async function (req, res, next) {
  try {
    let name = "";
    if (!req.body || !req.body.name) {
      const firstNames = [
        "John",
        "Sarah",
        "Michael",
        "Priya",
        "Anita",
        "David",
      ];
      const lastNames = [
        "Smith",
        "Sharma",
        "Khan",
        "Johnson",
        "Verma",
        "Patel",
      ];

      const randomFirst =
        firstNames[Math.floor(Math.random() * firstNames.length)];
      const randomLast =
        lastNames[Math.floor(Math.random() * lastNames.length)];
      name = `${randomFirst} ${randomLast}`;
    } else {
      name = req.body.name;
    }

    const user = new User(name);

    const dbResponse = await UserModel.create(user);
    const response = new Response(dbResponse);
    logger.info(`User created:`, user);
    res.send(response);
  } catch (error) {
    const response = new Response(null, false);
    res.status(500).send(response);
  }
});

/**
 * @swagger
 * /users/name:
 *   post:
 *     summary: Create a user with a given name
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     id:
 *                       type: integer
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                     role:
 *                       type: string
 *                     permissions:
 *                       type: array
 *                       items:
 *                         type: string
 *                     age:
 *                       type: integer
 *                 success:
 *                   type: boolean
 *       500:
 *         description: Server error
 */
router.post("/name", function (req, res, next) {
  try {
    const user = new User(req.body.name || "Default User");
    const response = new Response(user);
    logger.info(`User created:`, user);
    res.send(response);
  } catch (error) {
    const response = new Response(null, false);
    res.status(500).send(response);
  }
});

export default router;
