const User = require('../models/User');
const { mongooseToObject } = require('../../util/mongoose');
const accessTokenSecret = "mySecretAccessToken123456";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const xml2js = require('xml2js');


class accountController {

    // [GET] /account/signIn||signUp
    sign(req, res, next) {
        res.render('account/sign', { layout: 'other' });
    }

    updateProfile(req, res) {
        res.render('account/updateProfile', { layout: 'other' });
    }




    // [POST] /account/signup
    signUp(req, res, next) {
        var name = req.fields.name;
        var email = req.fields.email;
        var password = req.fields.password;
        var gender = req.fields.gender;
        var refresh_token = '';
        console.log(req.fields);
        User.findOne({
                email: email
            })
            .then(data => {
                console.log(data);
                if (data == null) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) {
                            res.json({ error: err });
                            return;
                        }
                        let user = new User({
                            name: name,
                            email: email,
                            password: hash,
                            gender: gender
                        });
                        console.log(hash);
                        user.save()
                            .then(user => {
                                var accessToken = jwt.sign({ email: email }, accessTokenSecret);
                                return User.findOneAndUpdate({
                                    email: email
                                }, {
                                    $set: {
                                        "accessToken": accessToken
                                    }
                                }, (error, data) => {
                                    res.json({
                                        "status": "success",
                                        "message": "Signed in successfully",
                                        "accessToken": accessToken,
                                        "profileImage": user.image
                                    });
                                });
                            })
                            .catch(error => {
                                res.json({
                                    'status': 'error',
                                    'message': 'Something went wrong!!!'
                                })
                            });
                    });
                } else {
                    res.json({
                        'status': 'error',
                        'message': 'Email is valid or already existed!!!'
                    });
                }
            })
            .catch(err => {
                res.json({
                    'status': 'error',
                    'message': 'Sign up failed: ' + err.message
                })
            })

        // , (error, user) => {
        //     if (user == null) {
        //         bcrypt.hash(password, 10, (err, hash) => {
        //             if (err) {
        //                 res.json({ error: err });
        //                 return;
        //             }
        //             let user = new User({
        //                 name: name,
        //                 email: email,
        //                 password: hash,
        //                 gender: gender
        //             });
        //             console.log(hash);
        //             user.save()
        //                 .then(user => {
        //                     var accessToken = jwt.sign({ email: email }, accessTokenSecret);
        //                     User.findOneAndUpdate({
        //                         "email": email
        //                     }, {
        //                         $set: {
        //                             "accessToken": accessToken
        //                         }
        //                     }, (error, data) => {
        //                         res.json({
        //                             "status": "success",
        //                             "message": "Signed in successfully",
        //                             "accessToken": accessToken,
        //                             "profileImage": user.image
        //                         });
        //                     });
        //                 })
        //                 .catch(error => {
        //                     res.json({
        //                         'status': 'error',
        //                         'message': 'Error!!!'
        //                     })
        //                 })
        //         });


        //     } else {
        //         res.json({
        //             'status': 'error',
        //             'message': 'Email or User name is valid or already existed!!!'
        //         });
        //     }
        // });
    }


    signIn(req, res, next) {
        var email = req.fields.SIemail;
        var password = req.fields.SIpassword;
        User.findOne({
                email: email,
            })
            .then(data => {
                if (user == null) {
                    res.json({
                        'status': 'error',
                        'message': 'Account does not exist'
                    });
                } else {
                    bcrypt.compare(password, user.password, function(error, isVerify) {
                        if (isVerify) {
                            var accessToken = jwt.sign({ email: email }, accessTokenSecret);
                            User.findOneAndUpdate({
                                'email': email,
                            }, {
                                $set: {
                                    'accessToken': accessToken
                                }
                            }, function(error, data) {
                                res.json({
                                    'status': 'success',
                                    'message': 'Signed in successfully',
                                    'accessToken': accessToken,
                                    'profileImage': user.image
                                })
                            })
                        } else {
                            res.json({
                                'status': 'error',
                                'message': 'Wrong Password!!!',
                            });
                        }
                    });
                }
            })
            .catch(err => {
                res.json({
                    'status': 'error',
                    'message': 'Something went wrong',
                })
            })



        // var email = req.fields.SIemail;
        // var password = req.fields.SIpassword;
        // User.findOne({
        //     email: email,
        // }, function(err, user) {
        //     if (user == null) {
        //         res.json({
        //             'status': 'error',
        //             'message': 'Email does not exist'
        //         });
        //     } else {
        //         bcrypt.compare(password, user.password, function(error, isVerify) {
        //             if (isVerify) {
        //                 var accessToken = jwt.sign({ email: email }, accessTokenSecret);
        //                 User.findOneAndUpdate({
        //                     'email': email,
        //                 }, {
        //                     $set: {
        //                         'accessToken': accessToken
        //                     }
        //                 }, function(error, data) {
        //                     res.json({
        //                         'status': 'success',
        //                         'message': 'Signed in successfully',
        //                         'accessToken': accessToken,
        //                         'profileImage': user.image
        //                     })
        //                 })
        //             } else {
        //                 res.json({
        //                     'status': 'error',
        //                     'message': 'Wrong Password!!!',
        //                 });
        //             }
        //         });
        //     }
        // });
    }


}

module.exports = new accountController;