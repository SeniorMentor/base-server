const model = require("../models");
const mongoose = require("mongoose");
const ObjectId = require('bson').ObjectId;

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
const postAnalytics = async(data) => {
    let {
        month, year, collegeId, tagDepth
    } = data;

    let users = (await model.User.find({college: collegeId}))?.map(x => x._id) ?? [];
    let result = await Promise.all(users.map(async(userId) => {
        let posts = await findPostsFilter(userId, month, year);
        return posts;
    }));

    let totalPosts = [];
    result.forEach(result => {
        totalPosts = [...totalPosts, ...result];
    });

    let tagIdsForLevel = (await model.Tag.find({depth: tagDepth }).select("_id"))?.map(x => String(x._id)) ?? [];

    let tagIdMap = {};
    totalPosts.forEach(post => {
        post.tags.forEach((tagId)=> {
            tagId = String(tagId);
            if(tagIdsForLevel.includes(tagId)) {
                tagIdMap[tagId] = tagIdMap[tagId] ?? 0;
                ++tagIdMap[tagId];
            }
        })
    })

    return tagIdMap;
}

const findPostsFilter = async (userId, month, year) => {
    const result = await model.Post.find({
        userId: userId,
        month: month,
        year: year
    });
    return result;
}
// /ana/students 

module.exports =  {
    eventAnalytics,
    postAnalytics
}
