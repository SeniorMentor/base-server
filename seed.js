const { faker } = require('@faker-js/faker');
const model = require('./models');
const { colleges, skills } = require("./constants");
const { userFactory } = require('./factory');
const { roles } = require('./config/roles');

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
        const data = await model.Skill.findOne({skill: skill});
        if(!data) {
            model.Skill.create({
                skill: skill
            })
        }
    })
}


const addUserInfo = async () => {
    await model.User.deleteMany({seed: true});
    await model.Post.deleteMany({seed: true});
    await userFactory({
        firstName: 'John',
        lastName: 'Doe',
        email: 'jdoe@gmail.com',
        role: roles.STUDENT,
    });
    await userFactory({
        fistName: 'Jai',
        lastName: 'Taylor',
        email: 'jtaylor@gmail.com',
        role: roles.COLLEGE_ADMIN,
    });
    let proms = [];
    for(i=0;i<10;i++){ 
        proms.push(userFactory);
    }
    await Promise.all(proms.map(async(elem)=>{
        await elem();
    }))
    console.log("seeding done")
    // await Promise.all(async ()=>{
    //     for(let i=0;i<10;i++){
    //         await userFactory();
    //     }
    // })
    

    // const data = await model.User.find({});
    
    // data.forEach(async (user)=>{
    //     user.imageLink = `${faker.image.people()}?random=${getRandomNum()}`;
    //     user.bio = faker.lorem.paragraph();
    //     user.role = 'student';
    //     if(!user.collegeId) {
    //         user.collegeId = await getRandomIdFromModel(model.College);
    //     }
    //     user.skills=[];
    //     for(let i=0;i<3;i++){
    //         const id = await getRandomIdFromModel(model.Skill);
    //         user.skills.push(id);
    //     }
    //     user.save();
    // })
}
 
module.exports = {
    seedDb
};