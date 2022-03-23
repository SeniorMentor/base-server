const mongoose = require('mongoose');

const connectDb = async () => {
    mongoose.connect(process.env.URI,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log("Connected with mongodb")
    }); 
}

module.exports = {
    connectDb
}
 