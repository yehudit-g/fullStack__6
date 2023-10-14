var mysql = require('mysql2');

var conn = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: "fullstack6", //"project6",
  password: "bontravail!" //"yehudit_db"
});

conn.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});




module.exports=conn;