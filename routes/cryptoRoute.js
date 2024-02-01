const express = require('express')
const router = express.Router()
const {cryptoController} = require('../controller/cryptoController')

router.get('/',cryptoController)

module.exports = router