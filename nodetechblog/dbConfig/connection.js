let mysql = require("mysql");
let conn = mysql.createConnection({
    host:"localhost",
    user :"root",
    password :"123",
    database :"techblog"
})

conn.connect((error)=>{
    if(error){
        console.log(error.message);
    }
    console.log("Connection created");
})
module.exports = conn;