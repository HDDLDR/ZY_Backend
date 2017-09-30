/**
 * Created by lenovo on 2017/9/19.
 */
var express = require('express');
var mysql = require("mysql");
var router = express.Router();

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'cjd970110', //MySQL安装时设置的密码
    database:'zy_design', //数据库名称
    port:'3307' //端口号
});

/* GET users listing. */
router.post('/serone', function(req, response, next) {
    getPage(function (result) {
        response.send(result);
        // console.log(result);
    });
});

function getPage(callback) {
    pool.getConnection(function (err,connection) {
        var sql = "select * from serone";
        connection.query(sql,function (err,result) {
            if(err){
                console.log("Error:"+err.message);
                return;
            }
            connection.release();//释放连接
            callback(result);
        })
    })
}

module.exports = router;