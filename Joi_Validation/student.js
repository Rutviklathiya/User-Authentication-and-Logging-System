const express = require('express');
const router = express.Router();
const studentValidate = require('./student_Joivalidate.js');
const { check, validationResult } = require('express-validator');

// Read All
router.get('/', async(req,res,next)=>{
    try{
        // const value = await student_schema.validateAsync(req.body);

        const value = await studentValidate.validateStudentDetails(req.body);
        res.json({
            message: "Hello Get All"
        })
    }catch(error){
        next(error);
    }
});

// Read One
router.get('/:id',(req,res,next)=>{
    res.json({
        message:"Hello Read One"
    });
});

// Create One
router.post('/',
        [
            check('first_name').not().isEmpty().withMessage("Name must have more than 5 characters"),
            check('last_name').optional().isLength({max:5}),
            check('gender').isIn(['male','female']).withMessage('Gender must be male or female'),
            check('mobile').isNumeric(),
            check('email').isEmail().normalizeEmail(),
            check('dob').isDate({format:'YYYY-MM-DD' }),  
        ],
        async (req,res,next)=>{
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty())
                {
                return res.status(422).json(errors.array());
                }
            else{
                res.json({
                    message: "Hello Create One: Data is valid",
                });
            }


    }catch(error){
        next(error);
    }


});


//  Update One
router.put('/:id',(req,res,next)=>{
    res.json({
        message:"Hello Update One"
    });
});


// Delete One
router.delete('/:id',(req,res,next)=>{
    res.json({
        message:"Hello Delete One"
    });
});

module.exports = router;
