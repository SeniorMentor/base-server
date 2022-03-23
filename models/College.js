const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollegeSchema = new Schema({
    name : String, 
    address : String, 
    students : Number,
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

module.exports = mongoose.model("college", CollegeSchema);
