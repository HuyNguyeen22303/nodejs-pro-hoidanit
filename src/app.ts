/// <reference path="./types/index.d.ts" />



// const express = require("express");
import express, { response } from "express";
import 'dotenv/config';
import webRoute from "routes/web";
import initDatabase from "config/seed";
import { request } from "http";
import passport from "passport";
import configPassPortLocal from "./middleware/passport.local";
import session, { Session } from "express-session";

import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';


const app = express();
const PORT = process.env.PORT || 8080;

//config express session
app.use(session({
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    //forces session save even if unchanged
    resave: false,
    //save unmodified sessions
    saveUninitialized: false,
    store: new PrismaSessionStore(
        new PrismaClient(),
        {
            // clear expired sessions every 1 day
            checkPeriod: 1 * 24 * 60 * 60 * 1000,  //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
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

// config global res.locals req.user  from passport
app.use((req, res, next) => {
    res.locals.user = req.user || null; // Pass user object to all views
    next();
});



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