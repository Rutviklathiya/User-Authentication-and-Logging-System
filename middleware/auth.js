const jwt = require('jsonwebtoken');


const auth = async (req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        const verifyUsre = jwt.verify(token,"HelloMyNameIsRutvikLathiyaMyPasswordIsRutvik@2332000");
        console.log(verifyUsre);

    }catch(error){
        res.status(401).send(error);
    }

}

module.exports = auth;