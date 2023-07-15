const express = require('express');
const app = express();
const con = require('./db_connection');

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/users/:id', (req, res) => {
    con.query(
        'SELECT * FROM users WHERE id = ?',
        [req.params.id],
        function(err, results) {
        res.send(results);
        });
});

app.get('/posts?userId=:user', (req, res) => {
    console.log("userId : " + req.params.userId);
    con.query(
        'SELECT * FROM posts WHERE userId = ?',
        [req.params.user],
        function(err, results) {
            res.send(err, results);
        }
    );
});

app.get('/posts/:id', (req, res) => {
    con.query(
        'SELECT * FROM posts WHERE id = ?',
        [req.params.id],
        function(err, results) {
            res.send(results);
        }
    );
})

app.get('/posts/:postId/comments', (req, res) => {
    con.query(
        'SELECT * FROM comments WHERE postId = ?',
        [req.params.postId],
        function(err, results) {
            res.send(results);
        }
    );
});

app.get('/todos?userId=:user', (req, res) => {
    con.query(
        'SELECT * FROM todos WHERE userId = ?',
        [req.params.user],
        function(err, results) {
            res.send(results);
        }
    );
});


const port = process.env.PORT || 3000
app.listen(3000, () => console.log('Listening on port 3000...'));