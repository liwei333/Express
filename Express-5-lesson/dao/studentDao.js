var dbutil = require("./dbutil");

function insertStudent(stuNum,name,age,stuClass,pwd,success){
    var inserSql = "insert into student(stu_num, name, age, class, pwd) value(?,?,?,?,?);";
    var params = [stuNum, name, age, stuClass, pwd];
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

function queryAllStudent(success){
    var querySql = "select * from student;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,function(error,result){
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
    "queryAllStudent":queryAllStudent,
    "insertStudent":insertStudent
}

