const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const notDat = require('./db/db.json');
const path = require('path');
const uuid = require('./helpers/uuid');
const fs = require('fs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/api/notes', (req, res) => res.json(notDat));

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (error, noted) => {
        let noting = JSON.parse(noted);
        var newNot = { 'title': `${req.body.title}`, 'text': `${req.body.text}`, 'id': uuid()};
        noting.push(newNot);
        notjso = JSON.stringify(noting);
        fs.writeFile('./db/db.json', notjso, (wrong) => {
            if (wrong) return res.status().json({status: 'wrong'})
            res.status(200).json({status: 'Right'})
        })
    })
});

app.listen(PORT, () => {
    console.log(`I'm listening at http://localhost:${PORT}`);
});