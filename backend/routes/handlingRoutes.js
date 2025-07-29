const express = require("express")

const router = express.Router();


const {Humanize,Summarize,Simplify} = require("../controllers/apiHandling")


router.post("/humanize",Humanize);
router.post("/summarize",Summarize);
router.post("/simplify",Simplify);


module.exports = router;