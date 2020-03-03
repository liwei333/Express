var studentDao = require("../dao/studentDao");
var url = require("url");
var fs = require("fs");
var path = new Map();
function queryAllStudent(request, response) {
    studentDao.queryAllStudent(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/api/queryAllStudent", queryAllStudent);

function insertStudent(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    studentDao.insertStudent(params.stuNum, params.name, params.age, params.class, params.pwd, function () {
        response.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
        response.write("添加成功");
        response.end();
    });
}
path.set("/api/insertStudent", insertStudent);

function login(request,response) {
    var params = url.parse(request.url,true).query;

    studentDao.queryStudentByStuNum(params.stuNum,function(result){
        if(result && result.length > 0 && result[0].pwd == params.pwd){
            //写cookie
            response.cookie("id",result[0].id);
            //重定向
            response.redirect("/api/queryAllStudent")
        }else{
            response.redirect("/loginError.html");
        }
    })

}
path.set("/login",login);

function getPic(request,response) {
    var params = url.parse(request.url,true).query;
    try {
        var data = fs.readFileSync("./" + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    } catch(e){
        response.writeHead(404);
        response.end();
    }

}
path.set("/getPic",getPic);
module.exports.path = path;