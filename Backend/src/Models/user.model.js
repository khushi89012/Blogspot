const mongoose = require('mongoose')




const Blogmodel = new mongoose.Schema({
    title:{type:String,require:true},
    author:{type:String,require:true},
    body:{type:String,require:true},
    // comments:[{body:String,data:Date}],
    // date:{type:Date,default:Date.now},
    // hidden:Boolean,
    // meta:{
    //     votes:Number,
    //     Favs:Number
    // }
})

module.exports = mongoose.model('Blog',Blogmodel)