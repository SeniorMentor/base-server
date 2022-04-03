const express = require("express");
const model = require("../models");
const router = express.Router();
const { eventsByCollege } = require("../controllers/event");
const { eventAnalytics } = require("../controllers/analytics");
const { checkToken } = require("../middlewares/checkToken");
const { hasCollegeAdminRole } = require("../middlewares/hasrole")
var createError = require('http-errors')

const collegeAdminMiddlewares = [
    checkToken,
    hasCollegeAdminRole
]

router.get("/events", collegeAdminMiddlewares, async(req,res) =>  {
    const userId = res.locals.userId;
    try {
        const collegeId = (await model.User.findById(userId)).college;
        const result = await eventsByCollege(collegeId);
        return res.status(200).json(result);
    } catch(err) {
        res.status(err.status ?? 500).json({
            error : err.message
        })
    }
})

router.get("/events/:id", collegeAdminMiddlewares, async(req,res) =>{
    const id = req.params.id;
    try {
      const result = await eventAnalytics(id);
      return res.json(result); 
    } catch(err) {
        res.status(err.status ?? 500).json({
            error : err.message
        })
    }
});


module.exports = router; 