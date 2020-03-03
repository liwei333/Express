var dbutil = require("./dbutil");

function inserUserMsg(name,picPath,originName,picSize,success){
    var inserSql = "insert into user_msg(name,pic_path,origin_name,pic_size) value(?,?,?,?);";
    var params = [name,picPath,originName,picSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(inserSql,params,function(error,result){
        if(error == null){
            console.log(result);
            success(result);
        }else{
            throw new Error(error);
        }
    });
    connection.end();
}
module.exports = {
    "inserUserMsg":inserUserMsg
}