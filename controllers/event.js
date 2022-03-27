
// GET /events => all events
const index = () => {

}

//POST /events => store event in db
const store = (userId, data) => {
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

// http://learnmongodbthehardway.com/schema/schemabasics/#:~:text=like%20comments%20pagination).-,Many%2DTo%2DMany%20(N%3AM),might%20have%20written%20many%20Books.
const getStudentsAttendingAnEvent = (eventId) => {

}

//create event factory in ./events