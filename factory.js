const { faker } = require('@faker-js/faker');
const model = require('./models');
const  { getRandomNum, getRandomIdFromModel, getRandomArrElem, getRandomIdArrayFromModel } = require('./helpers/helpers');
const { findByEmail }  = require('./controllers/user');
const { branch, year } = require('./constants');

const tagFactory = async(data = {}) => {
    if(!data.name) {
        return;
    }
    let exists = await model.Tag.findOne({name: data.name});
    if(exists) {
        return; 
    }
    let parent = null;
    if(data.parentName) {
        parent = await model.Tag.findOne({name: data.parentName});
    }
    return await model.Tag.create({
        name: data.name,
        parent: parent?._id,
        depth: data.depth
    });
}

const userFactory = async (data = {}) => {
    let role = data.role ?? 'student';
    let skills = [];
    let randomNum = getRandomNum();

    if(data.email) {
        let exists = await findByEmail(data.email);
        if(exists) {
            exists.events = [];
            await exists.save();
            return null;
        }
    }
    
    for(let i=0;i<3;i++){
        const id = await getRandomIdFromModel(model.Skill);
        skills.push(id);
    }

    const college = await getRandomIdFromModel(model.College);
    const user = await model.User.create({
        firstName: data.firstName ?? faker.name.firstName(),
        lastName: data.lastName ?? faker.name.lastName(),
        email: data.email ?? faker.internet.email(),
        password: "$2a$10$dbP8/1xn3a.h1.ALaqTG4ufwdB1RzY6/wgqqi0fIXYU61rEbXQCAe", // 1234
        college: data.college ?? college,
        role: role,
        imageLink: `${faker.image.people()}?random=${randomNum}` ?? null,
        bio: faker.lorem.paragraph(),
        skills: (role === 'student') ? skills : null,
        seed: data.seed ?? true,
        branch: (role === 'student') ? getRandomArrElem(branch) : null,
        year: (role === 'student') ? getRandomArrElem(year) : null,
        events: []
    });

    let proms = [];
    for(i=0;i<3;i++){ 
        proms.push(postFactory);
    }
    await Promise.all(proms.map(async(elem)=>{
        await elem({userId: user._id});
    }))

    return user;
}

const eventFactory = async(data={}) => {
    let collegeId = data.college;
    if(collegeId) {
        collegeId = await getRandomIdFromModel(model.College);
    }
     
    let today = new Date();
    let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + getRandomNum(30));
    const event = await model.Event.create({
        title: faker.company.catchPhrase(),
        body: faker.lorem.paragraph(),
        url: faker.internet.url(),
        college: collegeId,
        date: date,
        seed: data.seed ?? true
    })
    const users = await getRandomIdArrayFromModel(model.User, {role:'student'}, 6);

    await Promise.all(
        users.map(async (user)=>{
            user = await model.User.findById(user);
            user.events = user.events ?? [];
            user.events.push(event._id);
            await user.save();
        })
    );

    
}

const postFactory = async (data={}) => {
    let tags = await getRandomIdArrayFromModel(model.Tag,{},3);
    const post = await model.Post.create({
        userId: data.userId ?? await getRandomIdFromModel({role: 'student'}),
        title: data.title ?? faker.lorem.sentence(),
        body: data.body ??  faker.lorem.paragraphs(3),
        attachment: getRandomPostImageUri(),
        seed: true,
        tags: tags,
        createdAt: dateMonthsBack(3)
    });
}

const getRandomPostImageUri = () => {
    const num = getRandomNum() % 4;
    const hash = getRandomNum();
    if(num === 0) {
        return `${faker.image.business()}?random=${hash}`;
    }
    if(num === 1) {
        return `${faker.image.fashion()}?random=${hash}`;
    }
    if(num === 2) {
        return `${faker.image.nature()}?random=${hash}`;
    }
    if(num === 3) {
        return `${faker.image.technics()}?random=${hash}`;
    }
}

const promiseArray = (promise, count) => {
    let arr = []; 
    for(let i=0;i<count;i++) {
        arr.push(promise);
    }
    return arr;  
}

const dateMonthsBack = (count) => {
    const months = getRandomNum(count);
    let date = new Date();
    date.setMonth(date.getMonth()-months);
    return date;
}

module.exports = {
    userFactory,
    tagFactory,
    eventFactory
}