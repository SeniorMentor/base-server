const mongoose = require('mongoose');

const connectDb = async () => {
    console.log("Mongo uri", process.env.URI)
    mongoose.connect(process.env.URI,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true,
        useFindAndModify: false
    })
    .then(()=>{
        console.log("Connected with mongodb")
    })
      .catch((err)=>{
          console.log("Unable to connect with mongodb :", err);
      });
}

module.exports = {
    connectDb
}
