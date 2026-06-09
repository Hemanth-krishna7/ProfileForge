import express from 'express';
import { createProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route: POST /api/profile
router.post('/', createProfile);

export default router;
