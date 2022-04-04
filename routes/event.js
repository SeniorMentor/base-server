const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event")
const { uploadFile } = require("../helpers/helpers")
const { checkToken } = require("../middlewares/checkToken");
const { hasCollegeAdminRole } = require("../middlewares/hasrole")
var createError = require('http-errors')

const collegeAdminMiddlewares = [
    checkToken,
    hasCollegeAdminRole
]

router.get("/events", checkToken, async (req,res) => {
    try {
        const result = await eventController.getAllEvents();
        return res.json(result);
    } catch (err) {
        console.log(err);
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.post("/events", collegeAdminMiddlewares, async(req,res)=> {
    const userId = res.locals.userId; 
    let attachment = req.files?.attachment; 
    if(attachment?.length){
        attachment = attachment[0]; 
    }

    let fileName = attachment?.name;
    let extension = fileName?.split(".")[1]; 
    const file = attachment?.data;

    try { 
        const { 
            title, body , email, likes, dateTime, url
        } = req.body; 

        if(file) {
            const { 
                error, publicURL 
            } = await uploadFile('posts', 'public', file, extension); 
    
            if(error) {
                throw createError("501", error)
            }

            attachment = publicURL; 
        }

        const result = await eventController.storeEvent(userId, {
            title, body, attachment, email, likes, dateTime, url
        })
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.put("/events", checkToken, collegeAdminMiddlewares, async(req,res)=>{
    try {
        const userId = res.locals.userId; 
    
        const {
            title, body, email, likes, datetime
        } = req.body; 
        console.log(req.body); 
        const result = await eventController.updateEvent(eventId,{
            title, body, email, likes, datetime
        })    
        res.status(200).json(result)
    } catch(err) {
        console.log(err);
        res.status(500).json("Internal Server Error"); 
    }
})

router.get("/events/:eventId", checkToken, async(req,res)=>{
    try { 
        const eventId = req.params.eventId; 
        const result = await eventController.getEventById(eventId)
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/events/:eventId/attendees", checkToken, async(req,res)=>{
    try { 
        const eventId = req.params.eventId; 
        const result = await eventController.getStudentsAttendingAnEvent(eventId)
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.get("/events", async(req,res)=>{
    try { 
        const result = await eventController.getAllEvents()
        
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.post("/events/:eventId/attend", checkToken, async (req,res) => {
    const userId = res.locals.userId;
    const eventId = req.params.eventId;

    try {
        const result = await eventController.addAttendee(userId, eventId);
        return res.json({
            message: "Operation Successful"
        });
    } catch (err) {
        console.log(err);
        res.status(err.status).json({
            error : err.message
        })
    }
});

module.exports = router;
