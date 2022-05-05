// init code
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// const port = process.env.PORT;
const database = require('./database');
const userController = require('./controllers/user');
const jwt = require("jsonwebtoken");
const { func } = require('joi');
// const auth = require('./middleware/auth')

//middleware
app.use(morgan('dev'));
app.use(cors());
app.use('/api/user',userController);
app.use(cookieParser());
//default routes
app.get(
    ('/'),
    function(req,res){
        return res.json({
            status: true,
            message: "Index page working....."
        });
    }
);

app.get('/cookie_test',function(req,res){
    res.cookie("username","Rutvik Lathiya");
    res.send('cookie set');
})

app.get('/cookie_check',function(req,res){ 
    res.send('Value of your cookie is : '+ JSON.stringify(req.cookies))
})

// app.get('/secret',auth ,(req,res)=>{
//     res.send("You are authenticated user")
// })

// const createToken = async function(){
//     const token = await jwt.sign({_id:"61325f54d4a1c3725a49d546"}, "HelloMyNameIsRutvikLathiyaMyPasswordIsRutvik@2332000");
//     console.log(token);

//     const userVerification = jwt.verify(token,"HelloMyNameIsRutvikLathiyaMyPasswordIsRutvik@2332000");
//     console.log(userVerification);
// }

// createToken();

//start server
app.listen(5000,()=>{
    console.log('Your server is running on port 5000');
})