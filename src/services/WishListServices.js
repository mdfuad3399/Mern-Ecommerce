const WishModel = require('../models/WishModel')

const mongoose = require("mongoose")
const ObjectID = mongoose.Types.ObjectId


exports.WishListService = async(req) =>{
        try {
            
            let user_id=new ObjectID(req.headers.user_id);
            let matchStage={$match:{userID:user_id}}

            let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
            let unwindProductStage={$unwind:"$product"}

            let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brands"}}
            let unwindBrandStage={$unwind:"$brands"}


            let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"categories"}}
            let unwindCategoryStage={$unwind:"$categories"}



            let projectionStage={
                $project:{
                    '_id':0,'userID':0,'createdAt':0,'updatedAt':0,'product._id':0,
                    'product.categoryID':0,'product.brandID':0,
                    'brand._id':0,'category._id':0

                }
            }

            
            let data=await WishModel.aggregate([
                matchStage,
                JoinStageProduct,
                unwindProductStage,
                JoinStageBrand,
                unwindBrandStage,
                JoinStageCategory,
                unwindCategoryStage,
                projectionStage
            ])

            return {status:"success",data:data}
            
        } catch (error) {
            return {status:"success",message:error}
        }
}




exports.SaveWishListService = async(req) =>{
     try {
            let user_id=req.headers.user_id;
            let reqBody=req.body;
            reqBody.userID=user_id;
            await WishModel.updateOne(reqBody,{$set:reqBody},{upsert:true})
            return {status:"success",message:"Wish List Save Success"}
          
     } catch (error) {
        return {status:"Success",message:error};
     }

}
exports.RemoveWishListService = async(req) =>{
    try {
        let user_id=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=user_id;
        await WishModel.deleteOne(reqBody)
        return {status:"success",message:"Wish List Remove Success"}
    }
    catch (e) {
        return {status:"fail",message:"Something Went Wrong !"}
    }
}