<?php
define("apicheck",TRUE);
if(!isset($_SERVER['HTTP_REFERER']) ){
    http_response_code(404);
    include('errper.php');
    exit();
}
include('apicheck.php');
session_start();
$_SESSION['token'] = bin2hex(random_bytes(32));
echo hash('sha256',$_SESSION['token']);
?>