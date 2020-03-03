var studentDao = require("../dao/studentDao");
var url = require("url");
var path = new Map();
function queryAllStudent(request, response) {
    studentDao.queryAllStudent(function (result) {
        response.writeHead(200);
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/queryAllStudent", queryAllStudent);

function insertStudent(request, response) {
    var params = url.parse(request.url, true).query;
    console.log(params);
    studentDao.insertStudent(params.stuNum, params.name, params.age, params.class, params.pwd, function () {
        response.writeHead(200,{"Content-Type":"text/html; charset=utf-8"});
        response.write("添加成功");
        response.end();
    });
}
path.set("/insertStudent", insertStudent);

module.exports.path = path;