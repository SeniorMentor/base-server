const { faker } = require('@faker-js/faker');
const model = require('./models');
const { colleges, skills, tags } = require("./constants");
const { userFactory, tagFactory } = require('./factory');
const { roles } = require('./config/roles');
const  { getRandomIdArrayFromModel } = require('./helpers/helpers');


const seedDb = async () => {
    await model.Tag.deleteMany({});
    await seedTags(tags);
    await seedColleges();
    await seedSkills();
    await addUserInfo();
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

const seedTags = async(tags,parentTag = null) => {
    if(Array.isArray(tags)) { 
        tags.forEach(async (tag)=>{   
            await seedTags(tag,parentTag)
        })
        return;
    }

    if(typeof tags === "object") {
        for(key in tags) {
            await tagFactory({
                name: key,
                parentName: parentTag
            });
            seedTags(tags[key], key)
        }
    } 
    
    if(typeof tags === "string") { 
        console.log("str")
        tagFactory({
            name: tags,
            parentName: parentTag
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
        seed: false
    });
    await userFactory({
        fistName: 'Jai',
        lastName: 'Taylor',
        email: 'jtaylor@gmail.com',
        role: roles.COLLEGE_ADMIN,
        seed: false
    });
    let proms = [];
    for(i=0;i<10;i++){ 
        proms.push(userFactory);
    }
    await Promise.all(proms.map(async(elem)=>{
        await elem();
    }))
    console.log("seeding done")
}
 
module.exports = {
    seedDb
};