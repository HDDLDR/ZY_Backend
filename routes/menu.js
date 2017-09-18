var express = require('express');
var mysql = require('mysql');
var router = express.Router();



//创建连接池   createPool
var pool=mysql.createPool({
    host:'127.0.0.1',		//localhost
    user:'root',   			//用户名
    password:'root',    	//密码
    database:'zy_design', 		//数据库
    port:3306  	 			//端口号

});


//   封装一个方法
function getUserByName(sql,arrs,callback){
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


//导航
router.get('/mylist', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); //跨域
 	getUserByName(`select * from menu`,[],function(err,rows){
 		console.log(rows);
 		res.send(rows);
 	});
});

module.exports = router;
