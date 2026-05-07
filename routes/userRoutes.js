import express from 'express';

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userControllers.js';

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of all users
 *         content:
 *           application/json:
 *             example:
 *               - id: "67315fe14a9f23e01b23cc81"
 *                 username: "john_doe"
 *                 email: "john@example.com"
 *               - id: "67315fe14a9f23e0199bc28"
 *                 username: "mary_smith"
 *                 email: "mary@example.com"
 */
router.get('/', getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "67315fe14a9f23e01b23cc81"
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             example:
 *               id: "67315fe14a9f23e01b23cc81"
 *               username: "john_doe"
 *               email: "john@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 */
router.get('/:id', getUserById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "new_user"
 *               email:
 *                 type: string
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 example: "StrongPassword123"
 *           required:
 *             - username
 *             - email
 *             - password
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User created successfully"
 *               user:
 *                 id: "673200e14a9f23e01893b7e1"
 *                 username: "new_user"
 *                 email: "newuser@example.com"
 *       400:
 *         description: Missing fields
 *         content:
 *           application/json:
 *             example:
 *               message: "Email already exists"
 */
router.post('/', createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "673200e14a9f23e01893b7e1"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "updated_name"
 *               email:
 *                 type: string
 *                 example: "updated@example.com"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User updated successfully"
 *               user:
 *                 id: "673200e14a9f23e01893b7e1"
 *                 username: "updated_name"
 *                 email: "updated@example.com"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 */
router.put('/:id', updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "673200e14a9f23e01893b7e1"
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "User deleted"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               message: "User not found"
 */
router.delete('/:id', deleteUser);

export default router;