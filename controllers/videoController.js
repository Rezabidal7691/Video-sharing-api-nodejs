import { createError } from "../error/error.js"
import Video from "../models/Video.js"
import User from '../models/User.js'
class videoController {
       async addVideo (req ,res , next){
              let {title,desc,imgUrl,videoUrl} = req.body
              console.log(req.user);
              if(!title || !desc || !imgUrl || !videoUrl){
                     return next(createError(403 , 'All field is required!'))
              }
              try {
                     const savedVideo = new Video({
                            userId : req.user.id,
                            title,
                            desc,
                            imgUrl,
                            videoUrl
                     })
                     await savedVideo.save()
                     res.status(200).json(savedVideo)
              } catch (error) {
                     next(error)
              }
       }
       async updateVideo(req ,res , next){
              try {
                     const {id} = req.params;
                     const video = await Video.findById(id)
                     if(!video) return next(createError(404 , 'Video not found !'))
                     if(video.userId === id){
                            const {title , desc } = req.body;
                            const data = {title , desc };
                            if(!title || !desc ){
                                   return createError(403 , 'All field is required ')
                            }
                            const updateVideo = await Video.findByIdAndUpdate(id , {
                                   $set : {...data}
                            } , {new : true })
                            res.status(200).json({success : true , message : 'Video update successfully '})
                     }else{
                            createError(403 , 'You can update only your video')
                     }
              } catch (error) {
                     next(error)
              }
       }
       async deleteVideo(req ,res , next){
              try {
                     const {id} = req.params;
                     const video = await Video.findById(id)
                     if(!video) return next(createError(404 , 'Video not found '))
                     if(video.userId === id){
                            await Video.findByIdAndDelete(id)
                            res.status(200).json({success : true , message :'video deleted successfully'})
                     }else{
                            createError(403 , 'You can deleted only your video')
                     }
              } catch (error) {
                     next(error)
              }
       }
       async getVideo(req ,res , next){
              try {
                     let {id} = req.params ;
                     const video = await Video.findById(id)
                     if(!video) return next(createError(404 , 'Video not found '))
                     res.status(200).json(video)
              } catch (error) {
                     next(error)
              }
       }
       async addView(req ,res ,next){
              try {
                     const {id} = req.params;
                     await Video.findByIdAndUpdate(id , {
                            $inc : {views : 1 }
                     })
                     res.status(200).json({success : true , message : 'The view has been increased.'})
              } catch (error) {
                     next(error)
              }
       }
       async random(req ,res ,next){
              try {
                     const videos = await Video.aggregate([{$sample : {size : 40 }}])
                     res.status(200).json(videos)
              } catch (error) {
                     next(error)
              }
       }
       async trend(req ,res ,next){
              try {
                     const videos = await Video.find().sort({views : 1 })
                     res.status(200).json(videos)
              } catch (error) {
                     next(error)
              }
       }
       async sub(req ,res ,next){
              try {
                     const user = await User.findById(req.user.id)
                     const subscribedChannels = user.subscribedUsers;
                     const list = await Promise.all(
                            subscribedChannels.map(async (channelId )=>{
                                   return Video.find({ userId : channelId })
                            })
                     )
                     res.status(200).json(list.flat().sort((a , b)=> b.createdAt - a.createdAt ))
              } catch (error) {
                     next(error)
              }
       }
       async tags(req ,res ,next){
              try {
                     const tags = req.query.tags.split();
                     const videos = await Video.find({tags : {$in : tags }}).limit(20)
                     res.status(200).json(videos)
              } catch (error) {
                     next(error)
              }
       }
       async search(req ,res ,next){
              try {
                     const query = req.query.q;
                     const videos = await Video.find({title : {$regex : query , $options : "i"}})
                     res.status(200).json(videos)
              } catch (error) {
                     next(error)
              }
       }
}

export default new videoController()