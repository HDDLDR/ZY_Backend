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


//底部公司信息
router.get('/CPY_info', function(req, res, next) {
 	getUserByName(`select * from Home_footer`,[],function(err,rows){
 		// console.log(rows);
 		res.send(rows);
 	});
});


//底部用户提交信息
router.post('/USER_info', function(req, res, next) {
	var uName=req.body['uName'];
	var uEmail=req.body['uEmail'];
	var uPhone=req.body['uPhone'];
	var uContent=req.body['uContent'];

 	getUserByName(`insert into home_userinfo(uName,uEmail,uPhone,uContent) values(?,?,?,?)`,[uName,uEmail,uPhone,uContent],function(err,rows){
 		// console.log(rows);
 		res.send(rows);
 	});
});


module.exports = router;
