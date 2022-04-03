const model = require("../models");
const mongoose = require("mongoose");
 

// /ana/event/:id
const eventAnalytics = async (eventId) => {
    if(!eventId) {
        return;
    }
    eventId = mongoose.Types.ObjectId(eventId);
    let result = await model.User.aggregate([    
        { $match: { events: eventId }},
        { $sortByCount: "$college" }
    ])
     
    return result; 
}

// /ana/posts
const postAnalytics = async(collegeId) => {
    collegeId = (await model.College.findOne({}))._id; 
    let users = await model.User.find({college: collegeId}).select("_id");
    users = users.map(x => x._id);

    let posts = [];
    users.forEach(async (userId)=>{
        let res = await model.Post.find({userId: userId}).select("_id tags createdAt");
        posts = [...res, ...posts]
    });   
}

// const postAnalytics = async (collegeId) => {
//     collegeId = (await model.Post.findOne({}))._id;

//     let result = await model.Post.aggregate([    
//         {
//             $lookup: {
//                 let: { "userObjId": { "$toObjectId": "$userId" } },
//                 from: "users",
//                 pipeline: [
//                     { 
//                         $match: { 
//                             $expr: { 
//                                 $eq: [ "$_id", "$$userObjId" ] 
//                             } 
//                         }   
//                     }
//                 ],
//                 as: "userDetails"
//             }
//         },
//         {
//             $unwind: "$userDetails"
//         },
//         { $sortByCount: "$userDetails.college" }
        
//     ])
     
// }

// /ana/students 

module.exports =  {
    eventAnalytics
}