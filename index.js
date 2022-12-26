var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const alert = require("alert")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb+srv://suriya:9842242217@prashanna.vqy2kwz.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var password = req.body.password;

    var data = {
        "name": name,
        "password" : password
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('comicfront.html')

})
app.get("/billing", (req, res)=>{
    res.redirect('payment.html')
})
app.post("/billing", (req, res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var address = req.body.address;
    var city = req.body.city;
    var zipcode = req.body.zipcode;   
    var data1 = {
        "name" : name,
        "email": email,
        "address" : address,
        "city" : city,
        "zipcode" : zipcode }
    
        db.collection('payment').insertOne(data1,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Billing");
         });
     return res.redirect('carddetails.html')
})

app.get("/card", (req, res)=>{
    res.redirect('carddetails.html')
})
app.post("/card", (req, res)=>{
    var cardnumber = req.body.cardnumber;
    var expiremonth = req.body.expiremonth;
    var expireyear = req.body.expireyear;
    var ccv = req.body.ccv;
    var data2 = {
        "cardnumber" : cardnumber,
        "expiremonth": expiremonth,
        "expireyear" : expireyear,
        "ccv" : ccv,}
db.collection('card').insertOne(data2,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("card");
         });
         alert("Rs.255 PAYMENT SUCCESSFUL");
     return res.redirect('thanks.html')
})

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('logincomic.html');
}).listen(3000);


console.log("Listening on PORT 3000");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://suriya:9842242217@prashanna.vqy2kwz.mongodb.net/?retryWrites=true&w=majority";
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
                res.redirect('comicfront.html');
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





// var express = require("express")
// var bodyParser = require("body-parser")
// var mongoose = require("mongoose")

// const app = express()

// app.use(bodyParser.json())
// app.use(express.static('public'))
// app.use(bodyParser.urlencoded({
//     extended:true
// }))

// mongoose.connect('mongodb+srv://suriya:9842242217@prashanna.vqy2kwz.mongodb.net/?retryWrites=true&w=majority')

// var db =mongoose.connection;

// db.on('error',()=>console.log("Error in Connection to database"));
// db.once('open',()=>console.log("Connected to Database"))

// app.set("view engine", "ejs");

// app.post("/signup",(req,res)=>{
//     var name=req.body.name;
//     var password = req.body.password;
    
//     var data={
//         "name":name,
//         "password":password
//     }
//     db.collection('login').insertOne(data,(err,collection)=>{
       
//         if(err){
//             throw err;
//         }
//         console.log("Record Inserted successfully");
//     })
//     return res.redirect('comicfront.HTML')
// })

// app.get('/',(req,res)=>{
//     res.set({
//         "Allow-access-Allow-Origin":"*"
//     })
//     return res.redirect('index.html')
// }).listen(3000);

// console.log("Listening on PORT 3000");





