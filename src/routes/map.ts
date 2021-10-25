import express from "express";

const map = express.Router();

map.get("/", (req,res) => {
    res.render("map")
});


export default map;