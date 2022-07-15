//ติดต่อกับฐานข้อมูล
const slugify = require("slugify")
const Orders = require("../models/orderModel")
const { v4: uuidv4 } = require('uuid')

//บันทึกข้อมูล
exports.create = (req, res) => {
  const {ownerName, phone, service, email, petName, animalType, species, sex, congenitialDisease, description, fierceLevel, bookingDate, bookingTime} = req.body
  const sumSlug = petName + bookingDate
  const slug = slugify(sumSlug)
 
  //ถ้า slug เป็นภาษาไทย ให้ generate id  ออกมา
  if(!slug)slug = uuidv4()

  //Validate
 switch(true){
  case !ownerName:
    return res.status(400).json({error:"กรุณาป้อนชื่อผู้จอง"})
    break
  case !phone:
    return res.status(400).json({error:"กรุณาป้อนเบอร์โทรผู้จอง"})
    break
  case !service:
    return res.status(400).json({error:"กรุณาเลือกบริการ"})
    break
  case !email:
    return res.status(400).json({error:"กรุณาป้อนอีเมล"})
    break
  case !petName:
    return res.status(400).json({error:"กรุณาป้อนชื่อสัตว์เลี้ยง"})
    break
  case !animalType:
    return res.status(400).json({error:"กรุณาเลือกชนิดสัตว์เลี้ยง"})
    break
  case !species:
    return res.status(400).json({error:"กรุณาป้อนสายพันธุ์ของสัตว์เลี้ยง"})
    break
  case !sex:
    return res.status(400).json({error:"กรุณาเลือกเพศของสัตว์เลี้ยง"})
    break
  case !fierceLevel:
    return res.status(400).json({error:"กรุณาเลือกระดับความดุ"})
    break
  case !bookingDate:
    return res.status(400).json({error:"กรุณาเลือกวันที่จอง"})
    break
  case !bookingTime:
    return res.status(400).json({error:"กรุณาเลือกเวลาที่จอง"})
    break
}

  // //debug ดูค่าที่ส่ง request ไป  และ response อะไรกลับมา
  // res.json({
  //   data:{ownerName, phone, service, email, petName, species, sex, congenitialDisease, description, fierceLevel, bookingDate, bookingtime, slug}
  // })
  
  //การบันทึก
  Orders.create({ownerName, phone, service, email, petName, animalType, species, sex, congenitialDisease, description, fierceLevel, bookingDate, bookingTime, slug}, (err, orderes) => {
    if(err) {
      res.status(400).json({error:"เกิดข้อผิดพลาด"})
    }
    res.json(orderes)
  })
}

//แสดงข้อมูลทั้งหมด
exports.readAllOrders = (req, res) => {
  Orders.find({}).exec((err, orders) =>{
    if(err){
      res.status(400).json(err)
    }
    res.json(orders)
  })
}

//แสดงข้อมูลทีละรายการ
exports.singleOrder = (req, res) => {
  const {slug} = req.params
  Orders.find({slug}).exec((err, order) => {
    if(err){
      res.status(400).json(err)
    }
    res.json(order)
  })
}

//ลบข้อมูล
exports.remove = (req, res) => {
  const {slug} = req.params
  Orders.findOneAndRemove({slug}).exec((err, order) => {
    if(err)console.log(err)
    res.json({
      message:"ลบข้อมูลสำเร็จ"
    })
  })
} 

//แก้ไขข้อมูล
exports.update = (req, res) => {
  const {slug} = req.params
  //ส่งข้อมูลไปแก้ไข
  const {ownerName, phone, service, email, petName, animalType, species, sex, congenitialDisease, description, fierceLevel, bookingDate, bookingTime} = req.body
  Orders.findOneAndUpdate({slug},{ownerName, phone, service, email, petName, animalType, species, sex, congenitialDisease, description, fierceLevel, bookingDate, bookingTime},{new:true}).exec((err, order) => {
    if(err) console.log(err)
    res.json(order)
  }) 
}