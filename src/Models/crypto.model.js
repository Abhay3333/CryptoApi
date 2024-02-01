import mongoose from "mongoose";

const cryptoSchema = mongoose.Schema({
    low:{
        type: Number,
        
    },
    high:{
        type: Number,
        
    },
    last:{
        type: Number,
        
    },
    volume:{
        type: Number,
        
    },
    sell:{
        type: Number,
        
    },
    buy:{
        type: Number,
        
    },
    at:{
        type: Number,
    },
    name:{
        type: String,
    },
    baseUnit:{
        type:String
    },
    quoteUnit:{
        type:String
    },
    types:{
        type:String
    }
    
    },{
        timestamps:true,
    }
    
    
    
)

const Crypto = mongoose.model("Crypto",cryptoSchema);
export default Crypto;