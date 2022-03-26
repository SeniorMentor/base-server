const { faker } = require('@faker-js/faker');
const model = require('./models');
const  { getRandomNum, getRandomIdFromModel, getRandomArrElem } = require('./helpers/helpers');
const { findByEmail }  = require('./controllers/user');
const { branch, year } = require('./constants');

const userFactory = async (data = {}) => {
    let role = data.role ?? 'student';
    let skills = [];
    let randomNum = getRandomNum();

    if(data.email) {
        let exists = await findByEmail(data.email);
        if(exists) {
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
        seed: true,
        branch: (role === 'student') ? getRandomArrElem(branch) : null,
        year: (role === 'student') ? getRandomArrElem(year) : null
    });

    // for(let i=0;i<3;i++){
    //     postFactory({userId: user._id});
    // }
    let proms = [];
    for(i=0;i<3;i++){ 
        proms.push(postFactory);
    }
    await Promise.all(proms.map(async(elem)=>{
        await elem({userId: user._id});
    }))

    return user;
}

const postFactory = async (data={}) => {
    const post = await model.Post.create({
        userId: data.userId ?? await getRandomIdFromModel({role: 'student'}),
        title: data.title ?? faker.lorem.sentence(),
        body: data.body ??  faker.lorem.paragraphs(3),
        attachment: getRandomPostImageUri(),
        seed: true
    });
}

const getRandomPostImageUri = () => {
    const num = getRandomNum(4);
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

module.exports = {
    userFactory
}