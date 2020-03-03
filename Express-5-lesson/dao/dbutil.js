var mysql = require("mysql");

function createConnection(){
    var connection = mysql.createConnection({ //创建连接数据库
        host: "127.0.0.1",
        port: "3306",
        user: "root",
        password: "panda123",
        database: "school"
    });
    return connection;
}
module.exports.createConnection = createConnection;
