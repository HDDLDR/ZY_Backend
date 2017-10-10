var express=require('express');
var mysql=require('mysql');
var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var router=express.Router();


// var pool=mysql.createPool({
// 	host:'127.0.0.1',
// 	user:'root',
// 	password:'root',
// 	database:'zy_design',
// 	port:3306
// });

var pool = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'cjd970110', //MySQL安装时设置的密码
    database:'zy_design', //数据库名称
    port:'3307' //端口号
});


//   封装一个常用数据库方法
function getUsers(sql,arrs,callback){
	pool.getConnection(function(err,connection){
		connection.query(sql,arrs,function(err,result){
			if(err){
				console.log("ERRor:"+err.message);
				return;
			}
			connection.release();      //断开数据池  释放链接
			callback(err,result);
		})
	})
}


//Home__轮播图__图和文字信息
router.get('/Home_bannerPic',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
	   getUsers(`select * from home_bannertxt`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})


//Home__轮播图下的list
router.get('/Home_bannerList',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
	   getUsers(`select * from home_bannerlist`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})


//Home__热销推荐
router.get('/Home_recom',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
	   getUsers(`select * from home_recom`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})

















module.exports=router;
