const express = require('express');
const app = express();
const con = require('./db_connection');

app.get('/', (req, res) => {
    // res.send("Hello World");
    let all_users = con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
    });
    res.send(all_users);
});

app.get('/posts', (req, res) => {
    //res.send("hello get");
    let posts_data = con.query("SELECT * FROM posts", function (err, result, fields) {
        if (err) throw err;
        console.log(fields);
    });
    res.send(posts_data);
});

app.get('/posts/:id', (req, res) => {
    // let posts = postMessage.find(c => c.id == parseInt(req.params.id))
    // if (!posts) 
    //     res.status(404).send("The user has no posts");
    // res.send(posts);
    let posts_byID = con.query(`SELECT * FROM posts WHERE id = ${parseInt(req.params.id)}`, function (err, result) {
        if (err) throw err;
        console.log(result);
    });
    res.send(posts_byID);
});


app.get('/posts/:id/comments', (req, res) => {
    res.send("hello get");
});

// app.get('/comments?', (req, res) => {
//     res.send("hello get");
// });



app.listen(3000, () => console.log('Listening on port 3000...'));