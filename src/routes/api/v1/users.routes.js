const express = require("express");
const { usersControlle } = require("../../../controller");
const passport = require("passport");
const { sendOTP, verifyOTP } = require("../../../utliy/otp");
const upload = require("../../../middel_vare/uplode");
const { createToken } = require("../../../controller/users.controller");



const routes = express.Router();


routes.post('/ragister',
    //   upload.single("avtar"),
    usersControlle.ragister
  
)
routes.post(
    '/registerOTP',
    sendOTP,
    usersControlle.ragisterOTP
)

routes.post(
    '/verifyOTP',
    verifyOTP,
    usersControlle.verifyotp
)
routes.post('/login',
    usersControlle.login
)

routes.post('/newtoken',
    usersControlle.generateNewTokens
)
routes.post(
    '/logout',
    usersControlle.logout
)
routes.get('/chakAuth',
    usersControlle.chakAuth
)
routes.get('/google',
     passport.authenticate('google', { scope: ['profile', 'email'] }));
routes.get('/google/callback',
     passport.authenticate('google', { failureRedirect: '/login' }), async function (req, res) {
        // res.redirect('/');
        console.log("login sucessfully");
        console.log(req.isAuthenticated());
        console.log("session", req.session);
        console.log("user-data", req.user);
        // Successful authentication, redirect home.

        if (req.isAuthenticated()) {
            const { accessToken, refreshToken } = await createToken(req.user._id)
            // console.log({ accessToken, refreshToken });
            const optionAcc = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 1000
            }

            const optionRef = {
                httpOnly: true,
                secure: true,
                maxAge: 60 * 60 * 24 * 10 * 1000
            }

            res.status(200)
                .cookie("accessToken", accessToken, optionAcc)
                .cookie("refreshToken", refreshToken, optionRef)
                .redirect("http://localhost:3000/")
        }
    });


routes.get('/facebook', 
    passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

routes.get('/facebook/callback',
     passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    console.log("Facebook login success");
    res.send('<h1>Facebook Login Success<h1/>');
});



module.exports = routes;