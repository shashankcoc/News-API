require('dotenv').config()
const express = require('express');
const https=require("https");
const bodyParser = require('body-parser');

const app = express();

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

let chunks = [];

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const query=req.body.country;
    const type=req.body.category;
    const key=process.env.API_KEY;
    
    const url="https://newsapi.org/v2/top-headlines?country=" + query + "&category=" + type + "&apiKey=" + key;

    https.get(url,function(response){
        response.on('data', function(data) {
            chunks.push(data);
          }).on('end', function() {
            let data   = Buffer.concat(chunks);
            let schema = JSON.parse(data);
            //console.log(schema);

            res.render("condition",{schema:schema});
        })
        // console.log(response.statusCode);
    })
})

app.listen(3000,function(req,res){
    console.log("Server Started at 3000");
});



