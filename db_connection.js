var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "project_6",
  database: "project_6"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports=con;