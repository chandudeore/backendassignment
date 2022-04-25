const mongoose=require('mongoose');
const shortid=require('shortid');


const shorturlSchema=new mongoose.Schema({
    full_url:{type:String,required:true, index:{expires:'1m'}},
    short_url:{type:String,required:true,default:shortid.generate}
})
module.exports= mongoose.model('url',shorturlSchema)