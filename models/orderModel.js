//โครงสร้าง database ชื่อเข้าของ, เบอร์โทร, เลือกบริการ, email, ชื่อสัตว์เลี้ยง, สายพันธุ์, เพศ, โรคประจำตัว, รายละเอียดเพิ่มเติม, ระดับความดุร้าย, วันที่จอง, เวลาที่จอง, ผู้บันทึก, slug
const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
  ownerName:{
    type:String,
    required:true
    
  },
  phone:{
    type:String,
    required:true
    // unique:true
  },
  service:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  petName:{
    type:String,
    required:true
  },
  animalType:{
    type:String,
    required:true
  },
  species:{
    type:String,
    required:true
  },
  sex:{
    type:String,
    required:true
  },
  congenitialDisease:{
    type:String,
    required:false
  },
  description:{
    type:String,
    required:false
  },
  fierceLevel:{
    type:Number,
    required:true
  },
  bookingDate:{
    type:String,
    required:true
  },
  bookingTime:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true,
    default:"Admin"
  },
  slug:{
    type:String,
    lowercase:true
  }
},{timestamps:true})
module.exports = mongoose.model("Order",orderSchema)