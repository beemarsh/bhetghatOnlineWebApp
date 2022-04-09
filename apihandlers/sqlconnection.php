<?php
error_reporting(0);
if(!defined('sqlconnection_check')){
    http_response_code(404);
    include('errper.php');
    exit();
    }
if(!$sql_connect=mysqli_connect('localhost','root','')){
    echo 1;
    exit();
}
// if(!$sql_connect=mysqli_connect('sql306.epizy.com','epiz_25607853','MPA5Bn3GwPppmb')){
//     echo 1;
//     exit();
// }
if(!$db_connect=mysqli_select_db($sql_connect,'bhetghat')){
    echo 1;
    exit();
}
// if(!$db_connect=mysqli_select_db($sql_connect,'epiz_25607853_bhetghat')){
//     echo 1;
//     exit();
// }
mysqli_query($sql_connect,$db_connect);