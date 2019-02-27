<?php
    require "conn.php";
    if(isset($_POST['username'])){
      $username=$_POST['username'];
      $result=mysql_query("select * from users where username='$username'");
      if(mysql_fetch_array($result)){
          echo true;
      }else{
          echo false;
      }
    }
?>