import {Router } from 'express'
import videoController from '../../controllers/videoController.js';
import { verifyToken } from '../../jwt/verifyToken.js';
const router = Router();

router.post('/' , verifyToken , videoController.addVideo)
router.put('/:id' , verifyToken, videoController.updateVideo)
router.delete('/' , verifyToken, videoController.deleteVideo)
router.get('/find/:id' , videoController.getVideo)
router.get('/view/:id' , videoController.addView)
router.get('/random' , videoController.random)
router.get('/trend' , videoController.trend)
                                   
router.get('/sub' , verifyToken , videoController.sub)
router.get('/tags' , videoController.tags)
router.get('/search'  , videoController.search)


export default router;