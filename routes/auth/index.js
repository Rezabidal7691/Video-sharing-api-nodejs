import {Router } from 'express'
import authController from '../../controllers/authContorller.js';
const router = Router();

router.post('/singup' , authController.singup)
router.post('/singin' , authController.singin)

export default router;