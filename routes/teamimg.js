/**
 * Created by lenovo on 2017/9/19.
 */
var express = require('express');
var mysql = require("mysql");
var router = express.Router();
var fs = require("fs");
var formidable = require("formidable");

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'cjd970110', //MySQL安装时设置的密码
    database:'zy_design', //数据库名称
    port:'3307' //端口号
});

router.post('/teamimg', function(req,res){
    console.log('>>>>>up');
    var form = new formidable.IncomingForm();  //创建IncomingForm对象
    form.uploadDir = "public/images/"; //设置上传文件存放的文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名
    //如果form.uploadDir不赋值，它默认的位置是C:\User\用户名\AppData\Local\Temp
    //form.encoding = "utf-8";  //设定文件的编码
    form.parse(req, function(error, fields, files){
        console.log(files);
        for (var i in files) {
            var file = files[i];
            var fName = (new Date()).getTime();//+process.hrtime()[1].toString();
            switch (file.type) {
                case "image/jpeg":
                    fName = fName + ".jpg";
                    break;
                case "image/png":
                    fName = fName + ".png";
                    break;
            }
            var newPath= "public/images/" + fName;
            fs.renameSync(file.path,newPath);//重命名
            res.send(fName);
        }
    });
});

router.get('/teamimg', function(req, response, next) {
    var title = req.query.title;
    var job = req.query.job;
    var text = req.query.text;
    var teamimg = req.query.teamimg;
    console.log("title:"+title+";job:"+job+";text:"+text+";teamimg:"+teamimg);
    response.send("title:"+title+";job:"+job+";text:"+text+";teamimg:"+teamimg);
    save(title,job,text,teamimg,function (err,result) {
        response.send(result);
    });
});

//保存数据
function save(title,job,text,teamimg,callback) {
    pool.getConnection(function(err, connection) {
        var sql = "insert into teamimg (teamid,title,job,text,teamimg) values (0,?,?,?,?)";
        connection.query(sql, [title,job,text,teamimg], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }
            connection.release();
            console.log("invoked[getUserByUserName]");
            callback(err,result);
        });
    });
}

module.exports = router;