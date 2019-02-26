<?php
    require "conn.php";
    $id=$_GET['sid'];
    $result=mysql_query("select * from samsclub_list_data where sid=$id");
    $product=mysql_fetch_array($result,MYSQL_ASSOC);
    echo json_encode($product);
?>