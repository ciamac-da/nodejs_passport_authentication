const express = require("express");
const router = express.Router();


//login Page
router.get("/login", (req,res)=> res.render("login"));


// Register Page
router.get("/register", (req,res)=> res.render("register"));


// Register Handle
router.post('/register', (req,res) =>{
      const { name, email, password, password2 } = req.body;
});

module.exports = router;