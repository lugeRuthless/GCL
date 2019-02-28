<?php
    include "conn.php";
    $name=$_POST['username'];
    $result1=mysql_query("select * from users where username='$name'");
    if(mysql_fetch_array($result1)){
        echo true;
    }else{
        echo false;
    }
?>