var express = require("express");
var app = express();
var path = require("path");

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;
const charactersRoute = "/api/v1/characters";

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function (req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
});

app.listen(PORT, function(){
    console.log(`Avengers assemble on PORT ${PORT}`);
});

let characters = [
    {
        routeName: "captainamerica",
        name: "Captain America",
        role: "Saving the world",
        age: 100,
        strengthPoints: 1000
    },
    {
        routeName: "drstrange",
        name: "DR Strange",
        role: "Time weaver",
        age: 40,
        strengthPoints: 3000
    },{
        routeName: "ironman",
        name: "Iron Man",
        role: "Save the world, too",
        age: 45,
        strengthPoints: 500
    }
];

app.get(charactersRoute, function(req, res){
    return res.json(characters);
});

app.get(charactersRoute + "/:characterId", function(req, res){
    let characterId = req.params.characterId;
    console.log(`characterId: ${characterId}`);
    return res.json(characters.filter(x => {
        return x.routeName === characterId;
    }));
});

app.post(charactersRoute, function(req, res){
    let newCharacter = req.body;
    characters.push(newCharacter);
    return res.json(newCharacter);
});