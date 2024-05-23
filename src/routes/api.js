const express = require('express')
const router = express.Router()
const { ProductBrandList, ProductCategoryList, ProductSliderList, ProductListByBrand, ProductListByCategory, ProductListBySmilier, ProductListByKeyword, ProductDetails, ProductReviewList, ProductListByFilter, ProductListByRemark, CreateReview } = require('../controllers/ProductController')
const { UserOtp, VerifyLogin, UserLogout, CreateProfile, UpdateProfile, ReadProfile } = require('../controllers/UserController')
const AuthVerification = require('../middlewares/AuthVerification')
const { SaveWishList, RemoveWishList, WishList } = require('../controllers/WishListController')
const { CartList, SaveCartList, RemoveCartList, UpdateCartList } = require('../controllers/CartListController')
const { CreateInvoice, InvoiceList, InvoiceProductList, PaymentSuccess, PaymentCancel, PaymentFail, PaymentIPN } = require('../controllers/InvoiceController')
const { FeaturesList } = require('../controllers/FeaturesController')



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
router.get('/UserLogout',AuthVerification,UserLogout)
router.post('/CreateProfile',AuthVerification,CreateProfile)
router.post('/UpdateProfile',AuthVerification,UpdateProfile)
router.get('/ReadProfile',AuthVerification,ReadProfile)


// WishList
router.post('/SaveWishList',AuthVerification,SaveWishList)
router.post('/RemoveWishList',AuthVerification,RemoveWishList)
router.get('/WishList',AuthVerification,WishList)

// CartList
router.get('/CartList',AuthVerification,CartList)
router.post('/SaveCartList',AuthVerification,SaveCartList)
router.post('/UpdateCartList/:cartID',AuthVerification,UpdateCartList)
router.post('/RemoveCartList',AuthVerification,RemoveCartList)

//InVoice And Payment
router.get('/CreateInvoice',AuthVerification,CreateInvoice)
router.get('/InvoiceList',AuthVerification,InvoiceList)
router.get('/InvoiceProductList/:invoice_id',AuthVerification,InvoiceProductList)
router.post('/PaymentSuccess/:trxID',PaymentSuccess)
router.post('/PaymentCancel/:trxID',PaymentCancel)
router.post('/PaymentFail/:trxID',PaymentFail)
router.post('/PaymentIPN/:trxID',PaymentIPN)

//Features
router.get('/FeaturesList',FeaturesList)

//Review
router.post('/CreateReview',AuthVerification,CreateReview)



module.exports = router