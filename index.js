require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

//adding middlewarer
app.use(express.json())

const characters = require("./harrypotter.json")

app.get('/', function (req, res) {
  res.send('Hello to the world of Harry Potter');
});

app.get('/characters', (req, res) => {
    res.send(characters);
});

app.get('/characters/:id', (req, res) => {
    const id = req.params.id;
    const character = characters.find((character) => character.id == id)
    if (character == undefined) {
        res.status(404).send("The character does not exist");
    } else {
        res.send(character);
    }
});

const ids = characters.map((character) => (character.id))
let maxId = Math.max(...ids);
app.post('/characters', (req, res) => {
    const character = characters.find((character) => 
        character.name.toLowerCase()==req.body.name.toLowerCase())
    if(character != undefined) {
        res.status(409).send('The character already exists');
    } else {
        maxId += 1;
        req.body.id = maxId
        characters.push(req.body)
        res.status(201).send(req.body)
    }
})

app.delete('/characters/:name', (req, res) => {
    const name = req.params.name.toLowerCase();
    const characterIndex = characters.findIndex((character) => character.name.toLowerCase() == name)
    if (characterIndex == -1) {
        res.status(404).send("The character does not exist");
    } else {
        characters.splice(characterIndex,1);
        res.sendStatus(204);
    }
})

app.patch('/characters/:id', (req, res) => { 
   let id =  req.params.id
   const character = characters.find((character) => character.id == id)
   if (character == undefined) {
    res.status(404).send("The character does not exist");
} else {
    Object.assign(character, req.body)
    res.status(201).send("The character has been updated");
}

})

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});