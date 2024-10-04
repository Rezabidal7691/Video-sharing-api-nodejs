import dotenv from 'dotenv'
dotenv.config()
import { createError } from "../error/error.js";
import User from "../models/User.js";
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'
class authController {
       async singup(req, res, next) {
              try {
                     let { name, password, email } = req.body;
                     let user = await User.findOne({ email: email })
                     if (user) next(createError(404, 'The email is invalid !'))
                     user = await User.findOne({ name: name })
                     if (user) next(createError(404, 'The name is invalid ! '))
                     const salt = await bcrypt.genSalt(10)
                     const hashPassword = await bcrypt.hash(password, salt)
                     const newUser = new User({
                            name,
                            email,
                            password: hashPassword
                     })
                     await newUser.save()
                     res.status(200).json({ success: true, message: 'User Created successfuly ... ' })
              } catch (error) {
                     next(createError(404, 'not found sorry !'))
              }
       }
       async singin(req, res, next) {
              try {
                     const {email, password } = req.body;
                     const user = await User.findOne({ email: email })
                     if (!user) return next(createError(404, 'User not found ! '))
                     const isCorrect = await bcrypt.compare(password, user.password)
                     if (!isCorrect) return next(createError(400, 'Wrong Credentials ! '))
                     const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET)
                     res.cookie('access_token', token, {
                            httpOnly: true
                     }).status(200).json(user)
              } catch (error) {
                     next(error)
              }
       }
}

export default new authController()