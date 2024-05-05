const mongoose = require('mongoose')



const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/Mern-Ecommerce")
        console.log("Db Connection Successfully")
    } catch (error) {
        console.log(error)
    }
}

dbConnect()