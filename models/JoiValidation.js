const Joi = require('joi');

const schema = Joi.object({
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
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


schema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

schema.validate({});
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const value = schema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }