const axios = require("axios")
const CryptoData = require('../models/crypto.model')
const moment = require('moment')
require('moment-timezone')

const cryptoController = async (req, res) => {
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers')
        const res_data = await response.data

        const result = Object.values(res_data).slice(0, 10)

        const cryptoDataArray = result.map((data) => new CryptoData(data))

        await CryptoData.insertMany(cryptoDataArray)


        var storedData = await CryptoData.find().sort({_id:-1}).limit(10)
        
        storedData.reverse()

        const processedData = []

        storedData.forEach((data) => {
            var { base_unit, name, buy, sell, volume, open, low, high, last } = data;

            const timestamp = moment.utc(data.at * 1000)
            const tradeTime = timestamp.tz('Asia/Kolkata').format('DD/MM/YYYY [at] h:mm A')

            base_unit = base_unit.toUpperCase()
            const processedDoc = {
                baseUnit: base_unit,
                name: name,
                buy: buy,
                sell: sell,
                volume: volume,
                open: open,
                low: low,
                high: high,
                last: last,
                tradeTime: tradeTime,
            }

            processedData.push(processedDoc)
        })

            CryptoData.deleteMany({})

            res.render('index',{data:processedData})
        } catch (err) {
            console.log(err.message)
            res.status(500).send('Internal error fetching and storing data')
        }
    }

module.exports = {cryptoController }