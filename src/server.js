import connectDB from "./Config/db.js";
import dotenv from "dotenv";
import  app from "./app.js";
dotenv.config({
    path:"./.env"
})


app.get('/',(req,res)=>{
    res.send("Hello World");
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`\n SERVER RUNNING ON PORT ${process.env.PORT} \n`);
        
    })
})
.catch(err => console.log(err));