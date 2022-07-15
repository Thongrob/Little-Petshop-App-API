const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const orderRoute = require("./routes/order")
const authRoute = require("./routes/auth")


const app = express()

//Conect cloud database
mongoose.connect(process.env.DATABASE,{
  useNewUrlParser:true,
  useUnifiedTopology:false
})
.then(() => console.log("Connect to database completed"))
.catch((err) => console.log(err))

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// //route
////ทดสอบ route ให้ response ทุก path ที่ requesr เข้ามา 
// app.get("*",(req, res) => {
//   res.json({
//     data : "This is message from server"

//   })
// })
app.use('/api', orderRoute)
app.use('/api', authRoute)


const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Start server in  port ${port}`))