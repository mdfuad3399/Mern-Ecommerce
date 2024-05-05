const express = require('express')
const router = express.Router()
const { ProductBrandList, ProductCategoryList, ProductSliderList, ProductListByBrand, ProductListByCategory, ProductListBySmilier, ProductListByKeyword, ProductDetails, ProductReviewList, ProductListByFilter, ProductListByRemark } = require('../controllers/ProductController')
const { UserOtp, VerifyLogin } = require('../controllers/UserController')

// Product
router.get('/ProductBrandList',ProductBrandList)
router.get('/ProductCategoryList',ProductCategoryList)
router.get('/ProductSliderList',ProductSliderList)

router.get('/ProductListByBrand/:BrandID',ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID',ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID',ProductListBySmilier)
router.get('/ProductListByRemark/:Remark',ProductListByRemark)
router.get('/ProductListByKeyword/:Keyword',ProductListByKeyword)
router.get('/ProductDetails/:ProductID',ProductDetails)

router.get('/ProductReviewList/:ProductID',ProductReviewList)
router.post('/ProductListByFilter',ProductListByFilter);

// User
router.get('/UserOtp/:email',UserOtp)
router.get('/VerifyLogin/:email/:otp',VerifyLogin)


module.exports = router