import ListingModel from "../models/listingModel.js";

export const createListing = async (req,res,next) =>{
    try {
        const listing = await ListingModel.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error);
    }
}