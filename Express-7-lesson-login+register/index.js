var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser")

var app = new express();
app.use(express.static(globalConfig["page_path"]));
app.use(cookie());
app.get("/api/*",function(request,response,next){
    console.log(request.cookies);
    if(request.cookies.id){
        next();
    }else{
        response.redirect("/login.html");
    }
    
})

loader.init(app);


app.listen(globalConfig["port"]);

