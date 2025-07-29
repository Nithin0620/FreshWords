const History = require("../models/History")


exports.getRecentRequests = async(req,res)=>{
   try{
      const ip = req.ip;
      if(!ip) return res.status(404).json({success:false,message:"Ip address not found"});


      const recentRequests = await History.find({userIp : ip});

      return res.status(200).json({success:true,message:"Success",data:recentRequests});
   }
   catch(e){
      return res.status(500).json({success:false,message:"error in getRecentRequest"});
   }
}


exports.markAsFavorite = async(req,res)=>{
   try{
      const ip = req.ip;
      const historyId = req.params.id;

      if(!ip || !historyId) return res.staus(404).json({success:false,message:"Missing fields"});

      const history = await History.findById(historyId);

      const request = await History.findByIdAndUpdate(historyId,{
         isFavorite:!(history.isFavorite)
      },{new:true})

      return res.status(200).json({success:true,message:"Marked/unmarked as favorite successfully",data:request});

   }
    catch(e){
      return res.status(500).json({success:false,message:"error in markAsFavorite"});
   }
}