import express from 'express';
import { userRegister, userLogin } from '../controllers/authController.js';
import { validateLogin, validateRegister } from '../middlewares/validateUser.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Khyle
 *               email:
 *                 type: string
 *                 example: khyle@email.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: User already exists or Bad request
 *       500:
 *         description: Server error
 */
router.post('/register', validateRegister, userRegister);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: khyle@email.com
 *               password:
 *                 type: string
 *                 example: strongpassword123
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *               token:
 *                 type: string
 *       400:
 *         description: Invalid credentials or Bad request
 *       500:
 *         description: Server error
 */
router.post('/login', validateLogin, userLogin);

export default router;
