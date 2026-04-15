// const express = require("express");
import express, { response } from "express";
import 'dotenv/config';
import webRoute from "routes/web";
import initDatabase from "config/seed";
import { request } from "http";
import passport from "passport";
import configPassPortLocal from "./middleware/passport.local";
import session from "express-session";


const app = express();
const PORT = process.env.PORT || 8080;

//config express session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))





// config passport
app.use(passport.initialize());
configPassPortLocal();
app.use(passport.authenticate('session'));



//config view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// config static files : images , js, css
app.use(express.static('public'))


// config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));





//config route 
webRoute(app);


// seeding data

initDatabase();


app.use(function (req, res) {
    res.send('404');
});



app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);

})