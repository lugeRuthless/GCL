<?php
    require "conn.php";
    $result=mysql_query('select * from samsclub_list_data limit 40');
    $productList=array();
    for($i=0;$i<mysql_num_rows($result);$i++){
        $productList[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
    };
    echo json_encode($productList);
?>