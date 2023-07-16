const express = require('express');
const app = express();
const con = require('./db_connection');
app.use(express.json());
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/users/:id', (req, res) => {
    con.query(
        'SELECT * FROM users WHERE id = ?',
        [req.params.id],
        function (err, results) {
            res.send(results);
            // console.log(results);
        });
});

app.get('/posts?userId=:user', (req, res) => {
    console.log("userId : " + req.params.userId);
    con.query(
        'SELECT * FROM posts WHERE userId = ?',
        [req.params.user],
        function (err, results) {
            res.send(err, results);
        }
    );
});

app.get('/posts/:id', (req, res) => {
    con.query(
        'SELECT * FROM posts WHERE id = ?',
        [req.params.id],
        function (err, results) {
            res.send(results);
        }
    );
})

app.get('/posts/:postId/comments', (req, res) => {
    con.query(
        'SELECT * FROM comments WHERE postId = ?',
        [req.params.postId],
        function (err, results) {
            res.send(results);
        }
    );
});

app.get('/todos?userId=:user', (req, res) => {
    con.query(
        'SELECT * FROM todos WHERE userId = ?',
        [req.params.user],
        function (err, results) {
            res.send(results);
        }
    );
});


app.post('/users', (req, res) => {
    // const values= [req.params.id, req.params.name, req.params.username, req.params.email, req.params.address_sreet];

    const user = {
        id: req.body.id,
        name: req.body.name,
        //
    }
    if (!user.id) {
        return res.status(400).send('Missing user ID.');
    }

    con.query(
        //'INSERT INTO users(id, name, username, email,  address_street ) VALUES ?',
        //[values],
        'INSERT INTO users SET ?',
        user,
        function (err, results) {
            res.send(results);
        });
});


// app.post('/posts?userId=:user', (req, res) => {
//     console.log("userId : " + req.params.userId);
//     con.query(
//         'SELECT * FROM posts WHERE userId = ?',
//         [req.params.user],
//         function(err, results) {
//             res.send(err, results);
//         }
//     );
// });

// app.post('/posts/:id', (req, res) => {
//     con.query(
//         'SELECT * FROM posts WHERE id = ?',
//         [req.params.id],
//         function(err, results) {
//             res.send(results);
//         }
//     );
// })

// app.post('/posts/:postId/comments', (req, res) => {
//     con.query(
//         'SELECT * FROM comments WHERE postId = ?',
//         [req.params.postId],
//         function(err, results) {
//             res.send(results);
//         }
//     );
// });

// app.post('/todos?userId=:user', (req, res) => {
//     con.query(
//         'SELECT * FROM todos WHERE userId = ?',
//         [req.params.user],
//         function(err, results) {
//             res.send(results);
//         }
//     );
// });



const port = process.env.PORT || 3000
app.listen(3000, () => console.log('Listening on port 3000...'));