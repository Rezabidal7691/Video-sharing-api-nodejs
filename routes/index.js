import {Router} from 'express'
import userRoute from './user/index.js'
import videoRoute from './video/index.js'
import commentRoute from './comment/index.js'
import authRoute from './auth/index.js'
const router = Router();

router.use('/users' ,  userRoute)
router.use('/commetns' ,  commentRoute)
router.use('/videos' ,  videoRoute)
router.use('/auth' ,  authRoute)

export default router;