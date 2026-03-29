// const express = require("express");
import express from "express";
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Hello world! ádasdsaddsa");
})


app.get("/test", (req, res) => {
    res.send("Hello test!");
})


app.listen(PORT, () => {
    console.log(`My app is running on port: ${PORT}`);
    console.log(`Port .env ${process.env.PORT}`);
})