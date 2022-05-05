const Joi = require('@hapi/joi');

const student_schema = Joi.object({
    first_name: Joi.string().trim().required(),
    last_name: Joi.string().optional(),
    gender: Joi.string().required().valid('male','female'),
    mobile: Joi.number().required().min(1000000000),
    email: Joi.string().email({minDomainSegments:2,tlds:{allow:['com','net']}}).trim().required(),
    dob: Joi.date().max('2010-01-01').iso().required(),
    
})

async function validateStudentDetails(object){
    try{
        const value = await student_schema.validateAsync(object);
    }catch(error){
        throw new Error(error);
    }
}

module.exports = {validateStudentDetails}