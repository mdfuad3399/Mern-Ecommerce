const BrandModel = require("../models/BrandModel")
const CategoryModel = require("../models/CategoryModel")
const ProductSlider = require("../models/ProductSlider")
const ProductModel = require("../models/ProductModel")
const ProductDetailsModel = require("../models/ProductDetailsModel")
const ReviewModel = require("../models/ReviewModel")
const mongoose =require('mongoose');
const ObjectId = mongoose.Types.ObjectId


exports.BrandListService = async()=>{
    try {
        const data = await BrandModel.find()
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.CategoryListService = async()=>{
    try {
        const data = await CategoryModel.find()
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.SliderListService = async()=>{
    try {
        const data = await ProductSlider.find()
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.ListByBrandService = async(req)=>{
    try {
        const BrandID =new ObjectId(req.params.BrandID)
        const MatchStage = {$match:{brandID:BrandID}}
        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}
        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrandStage,
            joinCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            Projection,
        ])
        return {status:"Success" ,message:data}
        
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.ListByCategoryService = async(req)=>{
    try {
        const CategoryID =new ObjectId(req.params.CategoryID)
        const MatchStage = {$match:{categoryID:CategoryID}}
        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}
        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrandStage,
            joinCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            Projection,
        ])
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}

exports.ListByRemarkService = async(req)=>{
    try {

        const Remark= req.params.Remark;
        const MatchStage = {$match:{remark:Remark}}
        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}
        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrandStage,
            joinCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            Projection,
        ])
        return {status:"Success" ,message:data}

    } catch (error) {
        return {status:"Failed",message:error}
    }
}




exports.ListBySmilierService = async()=>{
    try {
        const CategoryID =new ObjectId(req.params.CategoryID)
        const MatchStage = {$match:{categoryID:CategoryID}}
        const LimitStage = {$limit:20}
        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}
        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            LimitStage,
            joinBrandStage,
            joinCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            Projection,
        ])
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.DetailsService = async(req)=>{
    try {
        const ProductID =new ObjectId(req.params.ProductID)
        const MatchStage = {$match:{_id:ProductID}}

        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}
        const joinDetailsStage = {$lookup:{from:"productdetails" ,localField:"_id" ,foreignField:"productID" ,as:"productdetails"}}


        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const unwindDetailsStage = {$unwind:"$productdetails"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrandStage,
            joinCategoryStage,
            joinDetailsStage,
            unwindBrandStage,
            unwindCategoryStage,
            unwindDetailsStage,
            Projection,
        ])
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}

exports.ListByKeywordService = async(req)=>{
    try {
        const searchRegx = {"$regex":req.params.Keyword ,"$options":"i"}
        const searchParam = [{title:searchRegx} ,{shortDes:searchRegx} ]
        const searchQuery = {$or:searchParam}

        const MatchStage = {$match:searchQuery}

        const joinBrandStage = {$lookup:{from:"brands" ,localField:"brandID" ,foreignField:"_id" ,as:"brands"}}
        const joinCategoryStage = {$lookup:{from:"categories" ,localField:"categoryID" ,foreignField:"_id" ,as:"categories"}}

        const unwindBrandStage = {$unwind:"$brands"}
        const unwindCategoryStage = {$unwind:"$categories"}
        const Projection = {$project:{"brands._id":0,"categories._id":0,"brandID":0,"categoryID":0}}

        const data = await ProductModel.aggregate([
            MatchStage,
            joinBrandStage,
            joinCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            Projection,
        ])
        return {status:"Success" ,message:data}
    } catch (error) {
        return {status:"Failed",message:error}
    }
}








exports.ReviewListService = async(req)=>{
    try {
        const ProductID =new ObjectId(req.params.ProductID)
        const MatchStage = {$match:{productID:ProductID}}

        const joinProfileStage = {$lookup:{from:"profiles" ,localField:"userID" ,foreignField:"userID" ,as:"profiles"}}

        const unwindProfilesStage = {$unwind:"$profiles"}
        const Projection = {$project:{"des":1,"rating":1,"profiles.cus_name":1,}}

        const data = await ReviewModel.aggregate([
            MatchStage,
            joinProfileStage,
            unwindProfilesStage,
            Projection,
        ])
        return {status:"Success" ,message:data}

    } catch (error) {
        return {status:"Failed",message:error}
    }
}










exports.CreateReviewService = async()=>{
    try {
        
    } catch (error) {
        return {status:"Failed",message:error}
    }
}
exports.ListByFilterService = async()=>{
    try {
        
    } catch (error) {
        return {status:"Failed",message:error}
    }
}