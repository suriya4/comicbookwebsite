const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
mongoose.connect("mongodb+srv://suriya:9842242217@prashanna.vqy2kwz.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true}, {useUnifiedTopology: true})

//create data scehma
const notesSchema = {
    username: String,
    password: String
}

const Note = mongoose.model("Note", notesSchema);

app.get ("/", function(req, res){
    res.sendFile(__dirname + "/login.html")
})

app.get ("/", function(req, res){
    res.sendFile(__dirname + "/style.css")
})

app.post("/signup", function(req, res){
    let newNote = new Note({
        username: req.body.username,
        password: req.body.password

    });
    newNote.save();
    res.redirect('home.html');}); 
//console.log("Login pass: "+newNote.password);


app.listen(3000, function(){
    console.log("server is running on 3000");
})


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var us = "";
var p = "";
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("test");
  dbo.collection("notes").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result[0].username);
    //us = result.username;
    //p = result.password
    //console.log("Username: "+ us);
    //console.log("Password: "+ p);
    app.post("/login", function(req, res){
        /*let newNote1 = new Note({
            username: req.body.logun,
            password: req.body.logpw
    
        });*/
        var username = req.body.logun;
        var password = req.body.logpw;
        let count = 0;
        //newNote.save();
        console.log("Login user: "+username);
        console.log("Password: "+password);

        for (let i =0; i<result.length; i++){
            
            if (username == result[i].username && password == result[i].password){
                console.log('Login Successful')
                res.redirect('home.html');
            }
            else{
                count +=1;
                //res.redirect('tic.html');
            }

            if(count == result.length){
                console.log("incorrect")
                //document.getElementById("pass").innerHTML = "I have changed!";

            }
        }

        

        
        
    });
    db.close();
  });
});




