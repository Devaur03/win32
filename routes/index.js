const express = require("express");
const router = express.Router();
const healthController = require("../controllers/healthController");

// Render home page
router.get("/", (req, res) => {
    res.render("home");  // Renders home.ejs
});



// Render another page, say index
router.get("/index", (req, res) => {
    res.render("index");  // Renders index.ejs
});

// Handle form submission and render results
router.post("/results", healthController.getResults);

module.exports = router;
