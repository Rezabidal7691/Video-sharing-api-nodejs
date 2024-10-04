import {Router } from 'express'
import commentController from '../../controllers/commentController.js';
import { verifyToken } from '../../jwt/verifyToken.js';
const router = Router();

router.post('/' , verifyToken , commentController.addComment)
router.delete('/:id' , verifyToken , commentController.deleteComment)
router.get('/:videoId' , verifyToken , commentController.getComments)

export default router;