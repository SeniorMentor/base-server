const { faker } = require('@faker-js/faker');
const model = require('./models');
const { colleges, skills, tags } = require("./constants");
const { userFactory, tagFactory, eventFactory } = require('./factory');
const { roles } = require('./config/roles');
const  { getRandomIdArrayFromModel } = require('./helpers/helpers');
const { eventAnalytics, postAnalytics} = require("./controllers/analytics");

const seedDb = async () => {
    await model.Tag.deleteMany({});
    await seedTags(tags);
    await seedColleges();
    await seedSkills();
    await addUserInfo();
    await seedEvents();
    await eventAnalytics();
    console.log("seeding done")
}

const seedColleges = async () =>{
    colleges.forEach(async (college) => {
        const clg = await model.College.findOne({name: college.name});
        const forceCreate = false;
        if(!clg || forceCreate) {
            model.College.create({
                name: college.name
            })
        }
    })
}

const seedSkills = async () => {
    skills.forEach(async (skill) => {
        const data = await model.Skill.findOne({skill: skill});
        if(!data) {
            model.Skill.create({
                skill: skill
            })
        }
    })
}

const seedTags = async(tags, parentTag = null, depth = 0) => {
    if(Array.isArray(tags)) { 
        tags.forEach(async (tag)=>{   
            await seedTags(tag,parentTag,depth+1)
        })
        return;
    }

    if(typeof tags === "object") {
        for(key in tags) {
            await tagFactory({
                name: key,
                parentName: parentTag,
                depth: depth
            });
            seedTags(tags[key], key, depth+1)
        }
    } 
    
    if(typeof tags === "string") { 
        tagFactory({
            name: tags,
            parentName: parentTag,
            depth: depth
        })
    }
}   

const addUserInfo = async () => {
    await model.User.deleteMany({seed: true});
    await model.Post.deleteMany({seed: true});
    await userFactory({
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail.com',
        role: roles.STUDENT,
        seed: false,
        events: []
    });
    await userFactory({
        fistName: 'Jai',
        lastName: 'Taylor',
        email: 'jtaylor@gmail.com',
        role: roles.COLLEGE_ADMIN,
        seed: false,
        events: []
    });
    let proms = [];
    for(i=0;i<10;i++){ 
        proms.push(userFactory);
    }
    await Promise.all(proms.map(async(elem)=>{
        await elem();
    }))
   
}
 
const seedEvents = async () => {
    let colleges = await model.College.find({});
    await model.Event.deleteMany({seed: true});
    Promise.all(colleges.map(async(college)=>{
        for(let i=0;i<4;i++) {
            await eventFactory({
                college: college._id
            });
        }
    }));
}

module.exports = {
    seedDb
};
