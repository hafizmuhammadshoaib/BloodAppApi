var express = require("express");
var routes = express.Router();
var fromDB = require("../models/donor");
const jwt = require("jsonwebtoken");


routes.get("/list", verifyToken, (req, res, next) => {
  fromDB.getDonors((error, rows) => {
    if (error) {
      res.status(404);
      res.json({ status: "error" });
    } else {
      res.status(200);
      res.json({ status: "success", donors: [...rows] });
    }
  });
});
routes.post("/add", verifyToken, (req, res, next) => {
  console.log("donor",req.body)
  fromDB.addDonors(req.body, (error, rows) => {
    if (error) {
      res.status(400);
      res.json({ status: "failure", body: "user not added" });
    } else {
      res.status(200);
      fromDB.getDonors((error, rows) => {
        res.json({ status: "success", donors: [...rows] });
      });
    }
  });
});
function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers['authorization'];
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    //   const bearer = bearerHeader.split(' ');
    // Get token from array
    //   const bearerToken = bearer[1];
    // Set the token
    req.token = bearerHeader;
    // Next middleware
    jwt.verify(req.token, "secretkey", (err, decoded) => {
      if (err) {
        res.status(403);
        res.json({ status: "unauthorize", body: "bad request" })
      }
      else {
        next();
      }
    })

  } else {
    // Forbidden
    res.status(403);
    res.json({ status: "unauthorize", body: "bad request" })
  }
}
module.exports = routes;
