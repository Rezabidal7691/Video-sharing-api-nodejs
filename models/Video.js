import mongoose, { Schema } from "mongoose";
const Video = new Schema({
       userId: {
              type: String,
              required: true
       },
       title: {
              type: String,
              required: true
       },
       desc: {
              type: String,
              required: true
       },
       imgUrl: {
              type: String,
              required: true
       },
       videoUrl: {
              type: String,
              required: true
       },
       views: {
              type: Number,
              default: 0
       },
       tags: {
              type: [String],
              default: []
       },
       likes: {
              type: [String],
              default: []
       },
       disLikes: {
              type: [String],
              default: []
       },
} , {
       timestamps : true
})

export default mongoose.model('Video' , Video)