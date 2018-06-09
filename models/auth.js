var db = require('../dbConnection');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var Auth={
    getUser:(user,callback)=>{
        console.log(user.email)
        return db.query("select name,userId,password from users where email=? ",[user.email],callback)

    },
    addUser:(user,callback)=>{
        bcrypt.hash(user.password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            return db.query("insert into users (name,email,password) values (?,?,?)",[user.name,user.email,hash],callback)
          });
    },
    getID:(user,callback)=>{
        return db.query("select name,userId from users where email=?",[user.email],callback)
    }
}
module.exports=Auth;