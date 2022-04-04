const model = require('../models');

// GET /events => all events
const getAllEvents = async() => {
    try {
        const res = await model.Event.find({}).sort({ createdAt:-1})
        .populate("collegeId","_id name");
        return res; 
    } catch(err){
        Promise.reject(err); 
    } 
}

const eventsByCollege = async(collegeId) => {
    try {
        const res = await model.Event.find({college: collegeId});
        return res;
    } catch(err) {
        Promise.reject(err);
    }
}

//POST /events => store event in db
const storeEvent = async(collegeId, data) => {
 //get college id from userId, get userId from res.locals
 let {
    title, body, attachment, email, likes ,dateTime, url
} = data 
try {
    if(dateTime) {
        datetime = (new Date(dateTime)).toString();
    }
    const res = await model.Event.create({
        collegeId : collegeId,
        title, body, attachment, email, likes, dateTime, url
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
const addAttendee = async (userId, eventId) => {
    try {
        let user = await model.User.findById(userId)
        let events = user.events;
        if(events.includes(eventId)) {
            events = events.filter(id => id!==eventId);
        } else {
            events.push(eventId);
        }

        return user;
    } catch(err){
        Promise.reject(err);
    }
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
    getStudentsAttendingAnEvent,
    eventsByCollege
}
//create event factory in ./events
