var mysql = require('mysql');
var conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'bloodappdb'
});
conn.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('DB connected');
    }
})
module.exports=conn;