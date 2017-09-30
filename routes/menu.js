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





//导航    (前后台获取导航内容)
router.get('/mylist', function(req, res, next) {
	// res.header("Access-Control-Allow-Origin", "*"); //跨域
 	getUser(`select * from menu`,[],function(err,rows){
 		res.send(rows);
 	});
});









 router.post('/Nav_Do', function(req, res, next) {
 	res.header("Access-Control-Allow-Origin", "*"); //跨域
    var uid=req.body['uid'];
    var txt=req.body['navtxt'];
    var does=req.body['does'];
    var orADD=req.body['orADD'];
    console.log(req.body);


     if(orADD!='true'&&does=='save'){
     //改
         getUser(`update menu set content=? where uid=?`,[txt,uid],function(err, rows, ) {
             res.send({flag:0});
         })
     }else if(orADD=='true' && does=='save'){
         //增
             getUser(`insert into menu(uid,content) values(?,?)`,[txt,uid],function(err, rows, ) {
             res.send({flag:1});
         	})
     }else if(does=='dele'){
      //删
	      getUser(`delete from menu where uid=?`,[uid],function(err, rows, ) {
             res.send({flag:2});
         	})
     }
})















//   封装一个方法
function getUser(sql,arrs,callback){
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


<<<<<<< HEAD
//导航
router.get('/mylist', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); //跨域
 	getUserByName('select * from menu',[],function(err,rows){
 		console.log(rows);
 		res.send(rows);
 	});
});

=======
>>>>>>> origin/master
module.exports = router;
