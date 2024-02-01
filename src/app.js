import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cryptoRouter from "./Route/crypto.route.js";
dotenv.config({
    path:"./.env"
})

const app = express();

app.set('view engine', 'ejs');


app.use(cors({
    origin:process.env.CORS_ORIGIN,
}));

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.use('/api/cryptos',cryptoRouter);




export default app;