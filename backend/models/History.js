const mongoose = require("mongoose")


const historyScheam = new mongoose.Schema({
   userIp:{
      type:String,
      require:true,
   },
   method:{
      type:String,
      enum:["humanize","summarize","simplify"],
   },
   originalText:{
      type:String,
   },
   outputText:{
      type:String,
   },
   isFavorite:{
      type:Boolean,
      default:false
   }
},{
   timestamps:true
})



module.exports = mongoose.model("History",historyScheam);