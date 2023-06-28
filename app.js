const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("hello get");
});

app.get('/posts', (req, res) => {
    res.send("hello get");
});

app.get('/posts/:id', (req, res) => {
    let posts = postMessage.find(c => c.id == parseInt(req.params.id))
    if (!posts) 
        res.status(404).send("The user has no posts");
    res.send(posts);
});

app.get('/posts/:id/comments', (req, res) => {
    res.send("hello get");
});

// app.get('/comments?', (req, res) => {
//     res.send("hello get");
// });