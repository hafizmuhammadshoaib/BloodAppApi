var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt=  require('bcrypt')


var fromDB = require("../models/auth");

router.post("/login", (req, res, next) => {
  console.log(req.body);
  fromDB.getUser(req.body, (error, rows) => {
    bcrypt.compare(req.body.password, rows[0].password, function(err, bcryptRes) {
        // res == true
        if (bcryptRes) {
            let user = {
              name: rows[0].name,
              userId: rows[0].userId
            };
            res.status(200);
            jwt.sign({ user }, "secretkey", (err, token) => {
              res.json({
                status: "success",
                token,
                user
              });
            });
      
            //   res.json({
            //     status: "success",
            //     user
            //   });
          } else {
            res.status(401);
            res.json({ status: "Email and Password Does not match" });
          }
    });
    
  });
});
router.post("/register", (req, res, next) => {
  fromDB.addUser(req.body, (error, rows) => {
    if (error) {
      res.status(401);
      res.json({ status: "user not created" });
    } else {
      fromDB.getID(req.body, (error, rows) => {
        res.status(200);
        let user = {
          name: rows[0].name,
          userId: rows[0].userId
        };
        jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
          res.json({
            status: "success",
            token,
            user
          });
        });
        // res.json({
        //   status: "success",
        //   user: { name: rows[0].name, userId: rows[0].userId }
        // });
      });
    }
  });
});
module.exports = router;
