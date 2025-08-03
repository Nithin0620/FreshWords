const express = require("express")

const router = express.Router();


const {getRecentRequests,markAsFavorite,clearHistory} = require("../controllers/historyHandling")


router.get("/getrecentrequest",getRecentRequests);
router.put("/markasfavorite/:id",markAsFavorite);
router.delete("/clearhistory",clearHistory);


module.exports = router;