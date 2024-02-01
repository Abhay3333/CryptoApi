import Crypto from "../Models/crypto.model.js";
import moment from "moment";
import 'moment-timezone';
import fetch from 'node-fetch'; 

const cryptoController = async (req, res) => {
    try {
        const response = await fetch('https://api.wazirx.com/api/v2/tickers');
        const data = await response.json(); 

        const result = Object.values(data).slice(0, 10);
        const dataArray = result.map((data) => {
            return new Crypto(data); 
        });
        await Crypto.insertMany(dataArray);

        let storedData = await Crypto.find({}).sort({ _id: -1 }).limit(10);
        storedData.reverse();
        const processData = [];

        storedData.forEach((data) => {
            let { low, high, last, volume, sell, buy, at, name, baseUnit, quoteUnit, types } = data;
            const timestamp = moment().tz('Asia/Mumbai');
            const trade = timestamp.format('DD/MM/YYYY [at] h:mm A');
            baseUnit = baseUnit.toUpperCase();
            const process = {
                low: low,
                high: high,
                last: last,
                volume: volume,
                sell: sell,
                buy: buy,
                at: at,
                name: name,
                baseUnit: baseUnit,
                quoteUnit: quoteUnit,
                types: types,
                trade: trade
            };
            processData.push(process);
        });

        await Crypto.deleteMany({}); 
        res.render("index", {
            data: processData
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong !",
            error: error
        });
    }
}

export default cryptoController;
