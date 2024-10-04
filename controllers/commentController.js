import { createError } from "../error/error.js"
import Comment from "../models/Comment.js"
import Video from "../models/Video.js"

class commentController {
       async getComments (req ,res, next){
              try {
                     const comments = await Comment.find({videoId : req.params.videoId })
                     res.status(200).json(comments)
              } catch (error) {
                     next(error)
              }
       }
       async deleteComment (req , res , next){
              try {
                     const video = await Video.findById(req.params.id)
                     const comment = await Comment.findById(req.params.id)
                     if(comment.userId === req.user.id || video.userId === req.user.id){
                            await Comment.findByIdAndDelete(req.params.id)
                            res.status(200).json({success : true , message : 'The comment has been deleted '})
                     }else{
                            return next(createError(403 , 'You can delete only your comment !'))
                     }
              } catch (error) {
                     next(error)
              }
       }
       async addComment (req, res ,next){
              try {
                     const {desc , videoId } = req.body;
                     const newComment = new Comment({
                            desc,
                            videoId,
                            userId : req.user.id 
                     })
                     await newComment.save()
                     res.status(200).json({success : true , message : "Comment created successfully ! "})
              } catch (error) {
                     next(error)
              }
       }
}

export default new commentController()