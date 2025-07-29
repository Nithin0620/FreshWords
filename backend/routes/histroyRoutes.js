const express = require("express")

const router = express.Router();


const {getRecentRequests,markAsFavorite} = require("../controllers/historyHandling")


router.get("/getrecentrequest",getRecentRequests);
router.put("/markasfavorite/:id",markAsFavorite);


module.exports = router;