

var db = require('../dbConnection');

var donor= {
    getDonors:(cb)=>{
        db.query("select u.name,d.bloodGroup from users u inner join donors d where u.userId=d.userId",cb);
    },
    addDonors:(reqBody,cb)=>{
        db.query("insert into donors values (?,?)",[reqBody.userId,reqBody.bloodGroup],cb)
    }
}
module.exports= donor;