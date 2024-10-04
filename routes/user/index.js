import { Router } from 'express'
import userController from '../../controllers/userController.js';
import { verifyToken } from '../../jwt/verifyToken.js';
const router = Router();

// Update
router.put('/:id' , verifyToken , userController.update)

// Delete
router.delete('/:id' , verifyToken , userController.delete)

// getUser
router.get('/find/:id' , userController.getUser)
// Subscibe
router.put('/sub/:id', verifyToken , userController.subsribe)
// UnSubscibe
router.put('/unSub/:id' , verifyToken, userController.subsribe)
// Likes
router.put('/likes/:videoId' , verifyToken, userController.likes)
// unLikes
router.put('/dislikes/:videoId' , verifyToken , userController.disLikes)
export default router;