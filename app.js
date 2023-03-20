//jshint esverion: 6
const express =  require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/sign.html");
});

app.post("/",function(req,res){
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_field:{
                    FNAME: firstName,
                    LNAME: lastName, 
                }
            }
        ]
    }
    console.log(firstName,lastName);


    const jsonData = JSON.stringify(data);

    const url= "https://us18.api.mailchimp.com/3.0/lists/e1256d7909";

    const option = {
        method: "POST",
        auth:"prose15:6c3d03f15b547d3593fe0f6162a66e5f-us18"
    }

    const request = https.request(url,option,function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.send(__dirname+"/faliure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});



app.listen(3000,function(){
    console.log("the port is running");
});


//api key

//6c3d03f15b547d3593fe0f6162a66e5f-us18
