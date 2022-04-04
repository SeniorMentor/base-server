const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title : String, 
    body : String,
    attachment : String, 
    email : String,
    likes : Number,
    dateTime: String,
    url: String,
    college: //college who organizes
    {
        type:Schema.Types.ObjectId,
        ref:'college'
    },
    seed: Boolean,
    // attendees: [{
    //     type:Schema.Types.ObjectId,
    //     ref:'user'
    // }]
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);


const Event = mongoose.model("event", EventSchema);
module.exports=Event;
