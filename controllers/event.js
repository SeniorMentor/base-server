const model = require('../models');
// GET /events => all events
const getAllEvents = async() => {
    try {
        const res = await model.Event.find({}).sort({ createdAt:-1})
        .populate("collegeId","_id name");
        console.log(res)
        console.log("Hi")
        return res; 
    } catch(err){
        Promise.reject(err); 
    } 

}

//POST /events => store event in db
const storeEvent = async(collegeId, data) => {
 //get college id from userId, get userId from res.locals
 const {
    title, body, attachment, email, likes ,datetime, url
} = data 
try {
    const res = await model.Event.create({
        collegeId : collegeId,
        title, body, attachment, email, likes, datetime, url
    })
    return res; 
} catch(err){
    Promise.reject(err); 
}  
}

//GET /events/:id => get particular event 
const getEventById = async(eventId) => {
    try {
        let event = await model.Event.findById(eventId) 
         .populate("collegeId","_id name");
        return event; 
    } catch(err){
        Promise.reject(err); 
    } 

}

//PUT /events/:id => update an event 

const updateEvent = async(eventId, data) => {
    try {
        const {
            title, body, attachment, email, likes ,datetime
        } = data
        const res = await model.Event.findOneAndUpdate({eventId},{
           title, body, attachment, email, likes, datetime
        },{new: true, omitUndefined: true});
        console.log("Here ", res); 
        return res; 
    } catch(err) {
        Promise.reject(err); 
    }   
}
 

//POST /events/:id/attend => user attends an event 
const addAttendee = (userId, eventId) => {
    // push event id in user collections events array
    // remove from array if already exists 
}

// http://learnmongodbthehardway.com/schema/schemabasics/#:~:text=like%20comments%20pagination).-,Many%2DTo%2DMany%20(N%3AM),might%20have%20written%20many%20Books.
const getStudentsAttendingAnEvent = async(eventId) => {
    try {
        let event = await model.Event.findById(eventId) 
        let attendees = event.attendees;
        return attendees; 
    } catch(err){
        Promise.reject(err); 
    } 
}

module.exports = {
    getAllEvents,
    storeEvent,
    getEventById,
    addAttendee,
    updateEvent,
    getStudentsAttendingAnEvent
    
}
//create event factory in ./events