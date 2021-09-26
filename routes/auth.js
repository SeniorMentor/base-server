const express = require("express");
const router = express.Router();

const {
    registerUser, loginUser 
} = require("../controllers/user");
 
router.post("/register", async(req,res)=>{
    try {
        const {
            email, password, firstName, lastName, year, branch
        } = req.body;

        if(!(email && password && firstName && lastName)) { 
            return res.status(400).json({
                error : "Email, Password, First Name and Last Name are compulsory fields"
            })
        }

        const result = await registerUser({
            email, password, firstName, lastName, year, branch
        })
        
        res.status(200).json(result); 
    } catch(err) {
        console.log(err, err.status, err.message); 
        res.status(err.status).json({
            error : err.message
        })
    }
})

router.post("/login", async(req,res)=>{
    try {
        const { 
            email, password 
        } = req.body;

        const result = await loginUser(email, password); 
        res.status(200).json(result); 

    } catch(err) {
        console.log(err); 
        res.status(err.status).json({
            error : err.message 
        })
    }
})  

module.exports = router;