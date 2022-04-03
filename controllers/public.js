const model = require("../models");

const allTags = async() => {
    const tags = await model.Tag.find({});
    return tags; 
};

const allColleges = async() => {
    const colleges = await model.College.find({});
    return colleges;
};

module.exports = {
    allTags, 
    allColleges
}