const mongoose=require('mongoose');

const menuSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy'],
        required:true,
    },

    is_drink:{
        type:Boolean,
        default:false,
    },
    indegredients:{
        type:[String],
        default:[],
    },
    no_of_sales:{
        type:Number,
        default:0,
    }
});


const menu=mongoose.model('menu',menuSchema);

module.exports=menu;

