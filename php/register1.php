<?php
    require "conn.php";
    if(isset($_POST['username']) &&isset($_POST['email']) && isset($_POST['password']) && isset($_POST['tel'])){
        $username=$_POST['username'];
        $email=$_POST['email'];
        $password=sha1($_POST['password']);
        $tel=$_POST['tel'];
    }
    mysql_query("insert users values(default,'$username','$password','$email','$tel')");
?>