const { BrandListService, CategoryListService, SliderListService, ListByBrandService, ListByCategoryService, ListByRemarkService, ListBySmilierService, DetailsService, ListByKeywordService, ReviewListService } = require("../services/ProductServices")




exports.ProductBrandList = async(req,res)=>{
    const result  =  await BrandListService()
    return res.status(200).json(result)
}

exports.ProductCategoryList = async(req,res)=>{
    const result  =  await CategoryListService()
    return res.status(200).json(result)
}

exports.ProductSliderList = async(req,res)=>{
    const result  =  await SliderListService()
    return res.status(200).json(result)
} 






exports.ProductListByBrand = async(req,res)=>{
    const result  =  await ListByBrandService(req)
    return res.status(200).json(result)
}

exports.ProductListByCategory = async(req,res)=>{
    const result = await ListByCategoryService(req)
    return res.status(200).json(result)
}
exports.ProductListByRemark = async(req,res)=>{
    const result = await ListByRemarkService(req)
    return res.status(200).json(result)
}



exports.ProductListBySmilier = async(req,res)=>{
    const result = await ListBySmilierService(req)
    return res.status(200).json(result)
}


exports.ProductDetails = async(req,res)=>{
    const result = await DetailsService(req)
    return res.status(200).json(result)
}





exports.ProductListByKeyword = async(req,res)=>{
    const result = await ListByKeywordService(req)
    return res.status(200).json(result)
}

exports.ProductListByFilter = async(req,res)=>{
    
}

exports.ProductReviewList = async(req,res)=>{
    const result = await ReviewListService(req)
    return res.status(200).json(result)
}
exports.CreateReview = async(req,res)=>{
    
}