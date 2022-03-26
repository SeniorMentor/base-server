const model = require('../models');
var createError = require('http-errors')
const { compareSync } = require("bcryptjs"); 
const {
    giveToken, hashData 
} = require("../helpers/helpers");
import { roles } from "../config"
import { findByEmail  } from './user';

export const registerUser = async (data) => {
    try {
        let {
            email, password, firstName, lastName, year, branch
        } = data; 
        
        const exists = await findByEmail(email); 
        if(exists) { 
            throw createError(400, "Email already exists");   
        }
        
        password = hashData(password);
        const user = await model.User.create({
            email, password, firstName, lastName, year, branch, role : roles.STUDENT
        })
      

        const token = giveToken({
            userId : user._id,
            role:  roles.STUDENT,
        }); 

        return {
            jwt : token,
        };   
       
    } catch(err) {
        return Promise.reject(err); 
    }
}

export const loginUser = async (email, password) => {
    try {
        const user = await model.User.findOne({email}); 
        if(!user) {
            return createError(500,"User does not exist"); 
        }
        console.log(password, user.password); 
        if(!compareSync(password,user.password)){ 
            throw createError(401, "Wrong Password")
        }

        const token = giveToken({
            userId : user._id,
            role:  user.role,
        }); 

        return {
            jwt : token
        };   
    } catch(err) {
        Promise.reject(err); 
    }
}