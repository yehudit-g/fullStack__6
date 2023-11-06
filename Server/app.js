const express = require('express');
const cors = require('cors');
const con = require('./db_connection');
const app = express();
app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.send("Hello World");
// });


//works! send id in params
app.get('/users/:id', (req, res) => {
    con.query(
        'SELECT * FROM users WHERE id = ?',
        [req.query.id],
        function (err, results) {
            res.send(results);
            // console.log(results);
        });
});

app.get('/users', (req, res) => {

    let username = req.query.username;
    let password = req.query.password;
  
    const query = `SELECT * FROM users INNER JOIN users_passwords as pass WHERE users.id=pass.userId AND users.username='${username}' 
    AND pass.password='${password}'`
  
    con.query(query, (err, results) => {
            if (err) {
              console.error('Error in request execution', err);
              return res.status(500).send({ error: 'An error occurred while retrieving user details.' });
            }
            if (results.length === 0) {
              return res.status(404).send({ error: 'user not found' });
            }
            res.status(200).send(results);
          });

});


//works! send uerId in params
app.get('/posts'/*?userId=:user*/, (req, res) => {
   // console.log("userId : " + req.query.userId);
    con.query(
        'SELECT * FROM posts WHERE userId = ?',
        [req.query.userId],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send id in params
app.get('/posts/:id', (req, res) => {
    con.query(
        'SELECT * FROM posts WHERE id = ?',
        [req.query.id],
        function (err, results) {
            res.send(results);
        }
    );
})

//works! send postId in params
app.get('/posts/:postId/comments', (req, res) => {
    con.query(
        'SELECT * FROM comments WHERE postId = ?',
        [req.params.postId],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send userId in params
app.get('/todos'/*?userId=:user'*/, (req, res) => {
    con.query(
        'SELECT * FROM todos WHERE userId = ?',
        [req.query.userId],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send JSON object in Body->row
app.post('/users', (req, res) => {
    // const values= [req.params.id, req.params.name, req.params.username, req.params.email, req.params.address_sreet];

    const user = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address_street: req.body.address_street,
        phone: req.body.phone
    }
    if (!user.id) {
        return res.status(400).send('Missing user ID.');
    }

    con.query(
        //'INSERT INTO users(id, name, username, email,  address_street ) VALUES ?',
        //[values],
        'INSERT INTO users SET ?',
        [user],
        function (err, results) {
            res.send(results);
        });
});

//works! send JSON object in Body->row
app.post('/posts', (req, res) => {
    //להוסיף בדיקה שהid של המשתמש קיים

    const post = {
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
    }

    con.query(
        'INSERT INTO posts SET ?',
        [post],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send JSON object in Body->row
app.post('/comments', (req, res) => {
    const comment = {
        id: req.body.id,
        postId: req.body.postId,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body
    };

    con.query(
        'INSERT INTO comments SET ?',
        [comment],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send JSON object in Body->row
app.post('/todos', (req, res) => {
    const todo = {
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        completed: req.body.completed
    };

    con.query(
        'INSERT INTO todos SET ?',
        [todo],
        function (err, results) {
            res.send(results);
        }
    );
});


//works! send JSON object in Body->row, and id in query params
app.put('/users/:id', (req, res) => {
    const updatedData = {
        id: req.body.id,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        address_street: req.body.address_street,
        phone: req.body.phone
    };
    const userId = req.params.id;

    con.query(
        'UPDATE users SET ? WHERE id = ?',
        [updatedData, userId],
        function (err, results) {
            if (err) {
                console.error(err);
                return res.status(500).send('Error updating user.');
            }
            res.send(results);
            console.log("Update success for user with ID: " + userId);
        });
});

//works! send JSON object in Body->row, and id in query params
app.put('/posts/:id', (req, res) => {
    const updatedData = {
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        body: req.body.body
    };
    const postId = req.params.id;

    con.query(
        'UPDATE posts SET ? WHERE id = ?',
        [updatedData, postId],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send JSON object in Body->row, and id+postId in query params
app.put('/posts/:postId/comments/:id', (req, res) => {
    const updatedData = {
        id: req.body.id,
        postId: req.body.postId,
        name: req.body.name,
        email: req.body.email,
        body: req.body.body
    };
    const postId = req.params.postId;
    const id = req.params.id;

    con.query(
        'UPDATE comments SET ? WHERE postId = ? && id = ?',
        [updatedData, postId, id],
        function (err, results) {
            res.send(results);
        }
    );
});

//works! send JSON object in Body->row, and id+postId in query params
app.put('/todos/:userId/:id', (req, res) => {
   const updatedData = {
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        completed: req.body.completed
    };
    const userId = req.params.userId;
    const id = req.params.id;

    con.query(
        'UPDATE todos SET ? WHERE userId = ? && id = ?',
        [updatedData, userId, id],
        function (err, results) {
            res.send(results);
        }
    );
});

//----delete
//works! send id in params-> Path_Variables 
app.delete('/users/:id', (req, res) => {
    con.query(
        'UPDATE users SET state=0 WHERE id=?',
      //  'DELETE FROM users WHERE id = ?',
        [req.params.id],
        function (err, results) {
            res.send(results);
        });
});

//works! send id in params-> Path_Variables 
app.delete('/posts/:id', (req, res) => {
    con.query(
        'UPDATE posts SET state=0 WHERE id=?',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.error('Error delete database:', err);
                res.status(500).send('Database delete error');
            } else {
                res.send(results);
            }
        }
    );
});

//works! send postId and id in params-> Path_Variables 
app.delete('/posts/:postId/comments/:id', (req, res) => {
    con.query(
        'UPDATE comments SET state=0 WHERE postId = ? && id = ?',
        [req.params.postId, req.params.id],
        function (err, results) {
            if (err) {
                console.error('Error delete database:', err);
                res.status(500).send('Database delete error');
            } else {
                res.send(results);
            }
        }
    );
});


//works! send id in params-> Path_Variables 
app.delete('/todos/:id', (req, res) => {
    con.query(
        'UPDATE todos SET state=0 WHERE id=?',
        [req.params.id],
        function (err, results) {
            if (err) {
                console.error('Error delete database:', err);
                res.status(500).send('Database delete error');
            } else {
                res.send(results);
            }
        }
    );
});



const port = process.env.PORT || 3000
app.listen(3000, () => console.log('Listening on port 3000...'));