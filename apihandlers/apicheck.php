<?php
if(!defined("apicheck")){
    http_response_code(404);
    include('errper.php');
    exit();
}
$url=$_SERVER['HTTP_REFERER'];
$vrl=parse_url($url);
if($vrl['host']=="127.0.0.1" && $vrl['path']=="/bhetghat/menu" || $vrl['path']=="/bhetghat/order" || $vrl['path']=="/bhetghat/users"){
// if($vrl['host']=="bhetghat.works" && $vrl['path']=="/menu" || $vrl['path']=="/order" || $vrl['path']=="/users"){
}else{
    echo 0;
    exit();
}