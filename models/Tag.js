const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TagSchema = new Schema({
    name : String, 
    parent:  {
        type:Schema.Types.ObjectId,
        ref:'tag'
    },
    depth: Number
},
{   
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } 
}
);

module.exports = mongoose.model("tag", TagSchema);
