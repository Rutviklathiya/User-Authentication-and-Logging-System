const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const User = require('./../models/user');
const { ResultWithContext } = require('express-validator/src/chain');
const Joi = require('@hapi/joi');

// Middleware Setup
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//route goes here

// default route
router.all('/', (req, res) => {
    return res.json({
        status: true,
        message: 'User Controller Working..'
    });
});

//create new user route

router.post(
    '/createNew',
    // [
    // check('username').not().isEmpty().trim().escape(),
    // check('password').not().isEmpty().trim().escape(),
    // check('email').isEmail().normalizeEmail()    
    // ],
    function (req, res) {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(422).json({
        //         status: false,
        //         message: "Form validation error.",
        //         errors: errors.array()
        //     });
        // }

        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        // return res.json({
        //     status: true, 
        //     message: "User data is OK...",
        //     data: req.body,
        //     hashedPassword : hashedPassword
        // });

        User.create(
            {
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword
            },
            function (error, result) {
                if (error) {
                    res.json({
                        status: false,
                        message: 'DB insert fail...',
                        error: error
                    })

                }

                return res.json({
                    status: true,
                    message: 'DB Insert Success',
                    result: result
                });
            }
        );

    }
)

router.get(
    '/find/:email',
    function (req, res) {
        User.find({email:req.params.email}, (error, result) => {
            if (error) {
                return res.json({
                    status: false,
                    message: 'DB find fail...',
                    error: error
                })
            }
            else {
                return res.json({
                    status: true,
                    message: "DB Find Success...",
                    result: result
                })
            }
        });
    }
);

router.put(
    '/update/:email',
    (req, res) => {
        if (req.params.email) {
            User.find({ email: req.params.email }, (err, result) => {
                if (err==null) {
                    return res.json({
                        status: false,
                        message: "Emial provided is not the database",
                        err: err
                    })
                }
                User.updateOne(
                    { email: req.params.email },
                    { username: "Meet" },
                    (error, result) => {
                        if (error) {
                            return res.json({
                                status: false,
                                message: "DB Update Fail..",
                                error: error
                            })
                        }
                        return res.json({
                            status: true,
                            message: "DB Update Success..",
                            result: result
                        })
                    });

            })
        }
        else {
            return res.json({
                status: false,
                message: "Email not provided"
            })
        }
    }
);
router.delete('/delete/:email', (req, res) => {
    if (req.params.email) {
        User.deleteOne(
            { email: req.params.email },
            function (error, result) {
                if (error) {
                    return res.json({
                        status: false,
                        message: "DB delete failed.."
                    })
                }
                return res.json({
                    status: true,
                    message: "DB Delete success...",
                    result: result
                })
            }
        );
    }
    else {
        return res.json({
            status: false,
            message: "Email not provided or not matched with database.."
        })
    }
});

router.post(
    '/login',
    [
        check('password').not().isEmpty().trim().escape(),
        check('email').isEmail().normalizeEmail()
    ],
    function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                status: false,
                message: "Form validation error",
                errors: errors.array()
            });
        }
        User.findOne(
            { email: req.body.email },
            function (error, result) {
                if (error) {
                    return res.json({
                        status: false,
                        message: 'DB read fail..'
                    })
                }
                if (result) {
                    const isMatch = bcrypt.compareSync(req.body.password, result.password);
                    if (isMatch) {
                        return res.json({
                            status: true,
                            message: "You are loged in...",
                            result: result
                        });

                    }
                    else {
                        return res.json({
                            status: false,
                            message: "Password not matched. Login failed.."
                        });
                    }

                }
                else {
                    return res.json({
                        status: false,
                        message: "Email provided is not in database"
                    })
                }
            }
        )

    }
);
//module exports

module.exports = router;