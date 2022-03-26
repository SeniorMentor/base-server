
// GET /events => all events
const index = () => {

}

//POST /events => store event in db
const store = () => {
 //get college id from userId, get userId from res.locals
}

//GET /events/:id => get particular event 
const show = () => {

}

//PUT /events/:id => update an event 
const update = () => {

}

//POST /events/:id/attend => user attends an event 
const addAttendee = (userId, eventId) => {
    // push event id in user collections events array
    // remove from array if already exists 
}

//create event factory in ./events