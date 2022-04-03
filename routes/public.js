const express = require("express");
const router = express.Router();
const {
    allTags, allColleges
} = require("../controllers/public")

router.get("/tags", async(req,res) => {
    const result = await allTags();
    return res.json(result);
})

router.get("/colleges", async(req,res)=>{
    const result = await allColleges();
    return res.json(result);
})

module.exports = router;