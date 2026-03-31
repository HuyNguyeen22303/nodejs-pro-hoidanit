// const express = require("express");
import express from "express";
import 'dotenv/config';
import webRoute from "routes/web";


const app = express();
const PORT = process.env.PORT || 8080;



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







app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);

})