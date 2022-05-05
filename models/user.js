const mongoose = require('mongoose');
// const Joi = require("joi")

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    createdOn:{
        type: Date,
        default: Date.now()
    }
    
})
mongoose.model('users',userSchema);

// const joicreation = async (create)=>{
//     const schema = Joi.object({
//         username: Joi.string().alphanum().min(3).max(30).required(),
//         email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
//         password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//     })

//     return schema.validate(create)
// }


// user model
module.exports = mongoose.model('users')
// module.exports = joicreation