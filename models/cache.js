const mongoose=require('mongoose');


const cacheSchema=mongoose.Schema({
    text:{
        type:String
    },
    Language:{
    type:String
    },
    toLanguages:[{
        type:mongoose.Schema.Types.ObjectId,
         ref:'Cache' 
    }]

});
const cache=mongoose.model('Cache',cacheSchema);
module.exports=cache;