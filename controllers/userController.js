import User from "../models/User.js"
import Video from "../models/Video.js";

class userController {
       async update(req, res, next){
              let id = req.params.id
              const {name , email , password } = req.body;
              const data = {name ,  email , password}
              if(id === req.user.id){
                     try {
                            const updateUser= await User.findByIdAndUpdate(id , {$set :{...data }} ,{new : true})
                            res.status(200).json(updateUser)
                     } catch (error) {
                            next(error)
                     }
              }else{
                     next(createError(403 , 'You can update only your account '))
              }
       }
       async delete(req, res, next){
              const {id} = req.params;
              if(id === req.user.id ){
                     try {
                            await User.findByIdAndDelete(id)
                            res.status(200).json({message : 'User deleted ... '})
                     } catch (error) {
                            next(error)
                     }
              }else{
                     res.status(403).json({success : false , message : 'You can delete only your account'})
              }
       }
       async getUser(req, res, next){
              let {id} = req.params;
              try {
                     const user = await User.findById(id)
                     res.status(200).json(user)
              } catch (error) {
                     next(error)
              }
       }
       async subsribe(req, res, next){
              try {
                     await User.findByIdAndUpdate(req.user.id , {
                            $push:{ subscribedUsers : req.params.id}
                     })
                     await User.findByIdAndUpdate(req.params.id , {
                            $inc : {subscribers : 1 }
                     })
                     res.status(200).json({success : true , message : "Subscription successfully ... "})
              } catch (error) {
                     next(error)
              }
       }
       async unsubscibe(req, res, next){
              try {
                     await User.findById(req.user.id , {
                            $pull : {subscribedUsers : req.params.id}
                     })
                     await User.findByIdAndUpdate(req.params.id , {
                            $inc : {subscribers : -1 }
                     })
              } catch (error) {
                     next(error)
              }
       }
       async likes(req, res, next){
              try {
                     const {id} = req.user;
                     const {videoId} = req.params;
                     const video = await Video.findById(videoId)
                     if(!video.likes.includes(id)){
                            await Video.findByIdAndUpdate(videoId , {
                                   $push : {likes : id },
                                   $pull : {disLikes : id }
                            })
                            return res.status(200).json({success  :true , message : 'Done liked'})

                     }else{
                            await Video.findByIdAndUpdate(videoId , {
                                   $pull : {likes : id }
                            })
                            return res.status(200).json({success  :true , message : 'Done unliked'})
                     }
              } catch (error) {
                     next(error)
              }
       }
       async disLikes(req, res, next){
              try {
                     const {id} = req.user;
                     const {videoId} = req.params;
                     const video = await Video.findById(videoId)
                     if(!video.disLikes.includes(id)){
                            await Video.findByIdAndUpdate(videoId , {
                                   $push : {disLikes : id },
                                   $pull : {likes : id }
                            })
                            return res.status(200).json({success  :true , message : 'Done disLiked'})

                     }else{
                            await Video.findByIdAndUpdate(videoId , {
                                   $pull : {disLikes : id }
                            })
                            return res.status(200).json({success  :true , message : 'Done unDisLiked'})
                     }
              } catch (error) {
                     next(error)
              }
       }
     

}

export default new userController()