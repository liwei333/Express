var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader");


var app = new express();
app.use(express.static(globalConfig["page_path"]));
loader.init(app);
// app.get("/queryAllStudent",loader.get("queryAllStudent"));

app.listen(globalConfig["port"]);

// fs.readdir() 方法将返回一个包含“指定目录下所有文件名称”的数组对象。
// app.use(express.static("./page"));//指定静态文件路径, ===传静态文件的根目录
// app.post();
// var studentController = require("./web/studentController");