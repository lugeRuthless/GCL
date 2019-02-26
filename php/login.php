<?php
    header('content-type:text/html;charset=utf-8');

    require 'conn.php';
    if(isset($_POST['username']) && isset($_POST['pwd'])){
        $username=$_POST['username'];
        $password=$_POST['pwd'];

        $result=mysql_query("select * from users where username='$username' and password='$password'");
        if(mysql_fetch_array($result)){
            echo true;
        }else{
            echo false;
        }
    }
?>