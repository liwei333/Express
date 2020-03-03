var express = require("express");
var globalConfig = require("./config");
var app = new express();
app.use(express.static(globalConfig["page_path"]));
// app.use(express.static("./page"));//指定静态文件路径, ===传静态文件的根目录
app.listen(globalConfig["port"]);