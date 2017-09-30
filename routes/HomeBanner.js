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


//Home__轮播图下的list
router.get('/Home_bannerlist',function(req,res,next) {
	   getUsers(`select * from home_bannerlist`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})




//Home__轮播图__主题图和标题
router.get('/Home_bannerPic',function(req,res,next) {
	   getUsers(`select * from home_bannertxt`,[], function(err, rows, fields) {
		       res.send(rows);
		});
})

/**************************************** 【轮播图Txt】 ************************************************/
//返回要修改的轮播图图片路径
router.post('/adds',function(req,res,next){
	var form = new formidable.IncomingForm();		//创建IncomingForm对象
    form.encoding = "utf-8";  //设定文件的编码
	form.uploadDir='public/images';
	//设置上传文件存放的文件夹，可以使用fs.rename()来改变上传文件的存放位置和文件名如果form.uploadDir不赋值，它默认的位置是C:\User\用户名\AppData\Local\Temp

	form.parse(req,function(error,fields,files){
		// console.log(files['uploadedFile'].size);
		// res.send(files);
			for(var i in files){
				var file = files[i];  //保存图片属性
				var fName = (new Date()).getTime();  //用一时间戳作为图片的名字
	            //检测图片的格式
	            switch(file.type){
					case "image/jpeg":
					fName=fName+".jpg";
					break;
					case "image/png":
					fName=fName+".png";
					break;
					case "image/gif":
					fName=fName+".gif";
					break;
				}
				var newPath='public/images/Pic_'+fName;   //要返回的图片的路径
				fs.renameSync(file.path,newPath);
				res.send(fName);
			}
		});
	});







//修改【轮播图Txt】
router.post('/setPic_sql',function(req,res,next) {
    var bTitle=req.body['bTitle'];
    var bTxt=req.body['bTxt'];
    var URL=req.body['URL'];
    var uid=req.body['uid'];
    console.log(req.body);

    		getUsers(`select * from home_bannertxt where uid=?`,[uid], function(err, rows, fields) {
					getUsers(`update home_bannertxt set picURL=?,bTitle=?,bTxt=? where uid=?`,[URL,bTitle,bTxt,uid], function(err, rowss, fields) {
							      		res.send({upMsg:'修改成功，将会删除原来的图!',oldPic:rows});
					});
			});

})


//接受要删除的图的路径并删除文件
router.post('/delePic_sql',function(req,res,next) {
    // res.header("Access-Control-Allow-Origin", "*");
    var deleURL=req.body['deleURL'];
    console.log(deleURL);

    fs.unlink(deleURL, function(){
    	res.send({deleMsg:'已删除旧图!'});
    });
})
/**************************************** end ************************************************/












module.exports=router;
