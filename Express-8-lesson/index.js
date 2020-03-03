var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");
var cookie = require("cookie-parser")
var multer = require("multer");//分析文件
var userMsgDao = require("./dao/userMsgDao");

var app = new express();
app.use(express.static(globalConfig["page_path"]));
app.use(cookie());

var uploadSingle = multer({dest:"./file"});

app.get("/api/*",function(request,response,next){
    console.log(request.cookies);
    if(request.cookies.id){
        next();
    }else{
        response.redirect("/login.html");
    }
    
})

loader.init(app);

//第一个参数传接口名，第二个参数传怎么解析的附件 然后自动存到文件夹下
app.post("/upload",uploadSingle.single("myfile"),function(request,response){
    console.log(request.file.originalname);
    console.log(request.file.size);
    console.log(request.file.path);
    console.log(request.body.name);
    //有两种传参数的方式
    //1.拼接在url的后面，将request.url转为url对象，找到query属性，拿到参数
    //2.放到form表单里，request的数据体（body）传上来的。request.body.xxx
   userMsgDao.inserUserMsg(request.body.name,request.file.path,request.file.originalname,request.file.size,function(result){
       console.log(request.file.path,"-----");
        var resp = {
            path: request.file.path
        }
        // console.log(JSON.stringify(resp),"resp");
        // console.log(response.write,"response++++");
        response.writeHead(200);
        response.write(JSON.stringify(resp));
        response.end();
   });
});

app.listen(globalConfig["port"]);


 //比如我要上传一个用户的信息
    //用户的图片放到某个路径下（某个文件下，也是磁盘上）
    //数据库中存 用户名, 用户头像路径

//文件的下载有两种情况