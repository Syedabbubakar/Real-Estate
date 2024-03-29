import ListingModel from "../models/listingModel.js";
import UserModel from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'

export const test = (req, res) => {
    res.send('Api route is working');
  }

export const updateUser = async (req, res, next) => {
  if(req.user.id !== req.params.id) return next(errorHandler(401, 'You can only update your own account!'))

  try {
    if(req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updateUser = await UserModel.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        avatar: req.body.avatar
      }
    }, {new: true})

    const {password, ...rest} = updateUser._doc

    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req, res, next) => {
  if(req.user.id!== req.params.id) return next(errorHandler(401, 'You can only delete your own account!'))
  try {
    await UserModel.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json({message: 'User has been deleted!'})
  } catch (error) {
    next(error)
  }
}

export const getUserListing = async (req, res, next) => {
  if(req.user.id === req.params.id) {
    try {
      const listings = await ListingModel.find({userRef: req.params.id})
      res.status(200).json(listings)
    } catch (error) {
      next(error);
    }
  }else {
    return next(errorHandler(401, 'You can noly view your own listing!'))
  }
}

export const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id)
  
    if(!user){
        return next(errorHandler(404, 'User not found'))
    }
  
    const {password: pass, ...rest} = user._doc
    res.status(200).json(rest)
    
  } catch (error) {
    next(error)
  }
}