const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event")
const { uploadFile } = require("../helpers/helpers")
const {
    checkToken
} = require("../middlewares/checkToken");
var createError = require('http-errors')

router.post("/events", checkToken, async(req,res)=>{
    console.log("running post")
    console.log(req.files); 
    const userId = res.locals.userId; 
    let attachment = req.files.attachment; 
    if(attachment.length){
        attachment = attachment[0]; 
    }
    console.log("Attachment", attachment); 

    let fileName = attachment.name;
    let extension = fileName.split(".")[1]; 
    const file = attachment.data;

    try { 
        const { 
            title, body , email, likes, datetime
        } = req.body; 

        const { 
            error, publicURL 
        } = await uploadFile('posts', 'public', file, extension); 

        if(error) {
            throw createError("501", error)
        }

        console.log("Adding new event");
        let attachment = publicURL; 
        const result = await eventController.storeEvent(userId, {
            title, body, attachment, email, likes, datetime
        })
        res.status(200).json(result); 
    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.put("/events", checkToken,upload.single('attachment'), async(req,res)=>{
    try {
        const userId = res.locals.userId; 
    
        const {
            title, body, attachment, email, likes, datetime
        } = req.body; 
        console.log(req.body); 
        const result = await eventController.updateEvent(eventId,{
            title, body, attachment, email, likes, datetime
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

router.get("/events/all", async(req,res)=>{
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

module.exports = router;