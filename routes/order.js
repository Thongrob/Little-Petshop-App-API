const express = require("express")
const router = express.Router()
const {create, readAllOrders, singleOrder, remove, update} = require('../controllers/orderController')
const {requireLogin} = require("../controllers/authController")

// //ทดสอบ route
// router.get('/order',(req, res) => {
// 	res.json({
// 	data: "Hello Route order"
// 	})
// })

router.post('/insert', create)
router.get('/orders', readAllOrders)
router.get('/order/:slug', requireLogin,  singleOrder)
router.delete('/remove/:slug', requireLogin, remove)
router.put('/update/:slug', requireLogin, update)

module.exports = router