const { faker } = require('@faker-js/faker');
const model = require('./models');
const { colleges, skills } = require("./constants");

const seedDb = async () => {
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
        console.log(skill);
        const data = await model.Skill.findOne({skill: skill});
        if(!data) {
            model.Skill.create({
                skill: skill
            })
        }
    })
}


const addUserInfo = async () => {
    const data = await model.User.find({});
    data.forEach(async (user)=>{
        user.imageLink = `${faker.image.people()}?random=${getRandom()}`;
        user.bio = faker.lorem.paragraph();
        if(!user.collegeId) {
            user.collegeId = await getRandomIdFromModel(model.College);
        }
        user.skills=[];
        for(let i=0;i<3;i++){
            const id = await getRandomIdFromModel(model.Skill);
            user.skills.push(id);
        }
        user.save();
    })
}

const getRandom = (num = 10000) =>{ 
    return Math.floor(Math.random() * num);
}

const getRandomElem = (arr) => {
    const idx = getRandom(arr.length);
    return arr[idx];
}

const getRandomIdFromModel = async (model) => {
    let all = await model.find({});
    all = all.map((item) => item._id);
    return getRandomElem(all);
}

module.exports = {
    seedDb
};