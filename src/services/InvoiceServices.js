const mongoose = require("mongoose");
const CartModel = require("../models/CartModel");
const ProfileModel = require("../models/ProfileModel");
const InvoiceModel = require("../models/InvoiceModel");
const InvoiceProductModel = require("../models/InvoiceProductModel");
const PaymentSettingModel = require("../models/PaymentSetting");
const ObjectID = mongoose.Types.ObjectId
const FormData = require('form-data');
const axios = require("axios");



const CreateInvoiceService = async (req) => {

    let user_id = new ObjectID(req.headers.user_id)
    let cus_email = req.headers.email

    //=============== Step 01: Calculate Total Payable & Vat =================//

    let matchStage = { $match: { userID: user_id } }
    let JoinStageProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } }
    let unwind = { $unwind: "$product" }

    let cartProducts = await CartModel.aggregate([
        matchStage, JoinStageProduct, unwind
    ])

    let TotalAmount = 0

    cartProducts.forEach((element) => {
        let price;
        if (element['product']['discount']) {
            price = parseFloat(element['product']['discountPrice'])
        } else {
            price = parseFloat(element['product']['price'])
        }
        TotalAmount += parseFloat(element['qty']) * price
    })

    let vat = TotalAmount * 0.05
    let Payable = TotalAmount + vat
    //=============== Step 01: Prepare Customer Details & Shipping Details =================//
    let Profile = await ProfileModel.aggregate([matchStage])
    let cus_details = `Name:${Profile[0]['cus_name']},Email:${cus_email},Address:${Profile[0]['cus_add']},Phone:${Profile[0]['cus_phone']}`

    let ship_details = `Name:${Profile[0]['ship_name']},City:${Profile[0]['ship_city']},Address:${Profile[0]['ship_add']},Phone:${Profile[0]['ship_phone']}`

    //=============== Step 03: Transaction & Other's ID =================//
    let tran_id = Math.floor(10000000 + Math.random() * 90000000);
    let val_id = 0;
    let delivery_status = "Pending"
    let payment_status = "Pending"

    //=============== Step 04: Create Invoice =================//
    let createInvoice = await InvoiceModel.create({
        userID: user_id,
        payable: Payable,
        cus_details: cus_details,
        ship_details: ship_details,
        tran_id: tran_id,
        val_id: val_id,
        delivery_status: delivery_status,
        payment_status: payment_status,
        total: TotalAmount,
        vat: vat,
    })

    //=============== Step 05: Create Invoice Product =================//

    let invoice_id = createInvoice['_id']
    cartProducts.forEach(async (element) => {
        await InvoiceProductModel.create({
            userID: user_id,
            productID: element['productID'],
            invoiceID: invoice_id,
            qty: element['qty'],
            price: element['product']['discount'] ? element['product']['discountPrice'] : element['product']['price'],
            color: element['color'],
            size: element['size']
        })
    })

    //=============== Step 06: Remove Carts =================//

    await CartModel.deleteMany({userID:user_id});

    return { status: "success", data: invoice_id }
}



const PaymentSuccessService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "success" });
        return { status: "success" }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}

const PaymentFailService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "fail" });
        return { status: "fail" }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}

const PaymentCancelService = async (req) => {
    try {
        let trxID = req.params.trxID;
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: "cancel" });
        return { status: "cancel" }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


const PaymentIPNService = async (req) => {
    try {
        let trxID = req.params.trxID;
        let status = req.body['status'];
        await InvoiceModel.updateOne({ tran_id: trxID }, { payment_status: status });
        return { status: "success" }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}

const InvoiceListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let invoice = await InvoiceModel.find({ userID: user_id });
        return { status: "success", data: invoice }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}

const InvoiceProductListService = async (req) => {
    try {

        let user_id = new ObjectID(req.headers.user_id);
        let invoice_id = new ObjectID(req.params.invoice_id);

        let matchStage = { $match: { userID: user_id, invoiceID: invoice_id } }
        let JoinStageProduct = { $lookup: { from: "products", localField: "productID", foreignField: "_id", as: "product" } }
        let unwindStage = { $unwind: "$product" }

        let products = await InvoiceProductModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindStage
        ])
        return { status: "success", data: products }
    } catch (e) {
        return { status: "fail", message: "Something Went Wrong" }
    }
}


module.exports = {
    CreateInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}