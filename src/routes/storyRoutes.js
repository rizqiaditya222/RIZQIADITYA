const express = require('express');
const StoryController = require('../controllers/storyController');
const upload = require('../config/multer');
const validate = require('../middlewares/validation');
const { createStoryValidator } = require('../validators/storyValidator');

const router = express.Router();

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get all visible stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: Stories retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Stories fetched successfully
 *               data:
 *                 - _id: 64f2c9b5d9a123456789abcd
 *                   photoUrl: https://cdn.rizqiaditya.com/stories/story-1.jpg
 *                   caption: pusink
 *                   location: Bali
 *                   isVisible: true
 *                   expiredAt: 2025-01-26T12:00:00.000Z
 *                   createdAt: 2025-01-25T12:00:00.000Z
 */
router.get('/', StoryController.getAllStories);

/**
 * @swagger
 * /api/stories/archive:
 *   get:
 *     summary: Get archived stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: Archived stories retrieved
 */
router.get('/archive', StoryController.getArchivedStories);

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get story by ID
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 64f2c9b5d9a123456789abcd
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Story retrieved successfully
 */
router.get('/:id', StoryController.getStoryById);

/**
 * @swagger
 * /api/stories:
 *   post:
 *     summary: Create new story
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [photo]
 *             properties:
 *               photo:
 *                 type: string
 *                 format: binary
 *               caption:
 *                 type: string
 *                 example: So much going on lately
 *               location:
 *                 type: string
 *                 example: Malang, Indonesia
 *     responses:
 *       201:
 *         description: Story created successfully
 */
router.post(
  '/',
  upload.single('photo'),
  validate(createStoryValidator),
  StoryController.createStory
);

/**
 * @swagger
 * /api/stories/{id}:
 *   delete:
 *     summary: Delete story
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: 64f2c9b5d9a123456789abcd
 *     responses:
 *       200:
 *         description: Story deleted successfully
 */
router.delete('/:id', StoryController.deleteStory);

module.exports = router;
