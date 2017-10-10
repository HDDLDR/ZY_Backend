var express=require('express');
var mysql=require('mysql');
var fs=require('fs');   //重新命名
var formidable=require('formidable');   //写入文件
var router=express.Router();


var pool=mysql.createPool({
	host:'127.0.0.1',
	user:'root',
	password:'root',
	database:'zy_design',
	port:3306
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


//热销推荐__
router.post('/msgList',function(req,res) {
    res.header("Access-Control-Allow-Origin", "*");
	   getUsers(`select * from recom_news`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})

















module.exports=router;
