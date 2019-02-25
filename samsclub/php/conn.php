<?php
	//php连接数据库。
	//1.连接数据库mysql_connect(主机名,用户名,密码)
		header('content-type:text/html;charset=utf-8');
		define('HOST','localhost');
		define('USERNAME','root');
		define('PASSWORD','');
		$conn=@mysql_connect(HOST,USERNAME,PASSWORD); //@:容错。
		if(!$conn){
			die('数据库连接错误'.mysql_error());
		}
	
	//2.选择数据库,设置字符集
		if(mysql_select_db('samsclub')){
			mysql_select_db('samsclub');
		}else{
			die('数据库不存在'.mysql_error());
		}
	//设置字符集
		mysql_query('SET NAMES UTF8');
?>